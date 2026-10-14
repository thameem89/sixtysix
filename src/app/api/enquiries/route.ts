import { NextResponse } from "next/server";
import { earliestAppointmentDate } from "@/data/salon";
import { validateEnquiry } from "@/data/validation";
const requests = new Map<string, { count: number; start: number }>();
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host"))
    return NextResponse.json(
      { error: "Request origin is not permitted." },
      { status: 403 },
    );
  if (Number(request.headers.get("content-length")) > 12000)
    return NextResponse.json(
      { error: "Request is too large." },
      { status: 413 },
    );
  const key = request.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  const now = Date.now();
  if (requests.size > 10000)
    for (const [k, v] of requests)
      if (now - v.start > 60000) requests.delete(k);
  const rate = requests.get(key);
  if (rate && now - rate.start < 60000 && rate.count >= 5)
    return NextResponse.json(
      { error: "Please wait a minute before trying again." },
      { status: 429 },
    );
  requests.set(key, {
    count: rate && now - rate.start < 60000 ? rate.count + 1 : 1,
    start: rate && now - rate.start < 60000 ? rate.start : now,
  });
  try {
    const raw = await request.text();
    if (raw.length > 12000)
      return NextResponse.json(
        { error: "Request is too large." },
        { status: 413 },
      );
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object" || Array.isArray(data))
      throw new Error("Invalid body");
    if (data.website)
      return NextResponse.json(
        { error: "Unable to submit this request." },
        { status: 400 },
      );
    const errors = validateEnquiry(data, earliestAppointmentDate());
    if (Object.keys(errors).length)
      return NextResponse.json({ errors }, { status: 422 });
    const endpoint = process.env.ENQUIRY_WEBHOOK_URL;
    if (!endpoint)
      return NextResponse.json(
        {
          error:
            "Online enquiries are not open yet. Your details have not been sent or saved. Please check back closer to our launch.",
        },
        { status: 503 },
      );
    const clean = {
      kind: data.kind,
      name: data.name.trim(),
      mobile: data.mobile.trim(),
      email: data.email.trim(),
      service: data.service,
      services: data.services || [data.service],
      specialist: data.specialist || "",
      date: data.date || "",
      time: data.time || "",
      notes: data.notes || "",
      consent: true,
      submittedAt: new Date().toISOString(),
    };
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.ENQUIRY_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(clean),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok)
      return NextResponse.json(
        { error: "We could not send your request. Please try again shortly." },
        { status: 502 },
      );
    return NextResponse.json({
      message:
        "Thank you. Your request has been received. Our team will contact you to confirm availability.",
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "We could not process your request. Please check your details and try again.",
      },
      { status: 400 },
    );
  }
}
