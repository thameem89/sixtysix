export type Enquiry = {
  kind: string;
  name: string;
  mobile: string;
  email: string;
  service: string;
  services?: string[];
  specialist?: string;
  date?: string;
  time?: string;
  notes?: string;
  consent: boolean;
  website?: string;
};
export function validateEnquiry(
  data: Partial<Enquiry>,
  earliestDate?: string,
): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!["priority", "appointment"].includes(data.kind || ""))
    errors.kind = "Choose a valid request type.";
  if (
    typeof data.name !== "string" ||
    data.name.trim().length < 2 ||
    data.name.length > 100
  )
    errors.name = "Please enter your full name (2–100 characters).";
  if (
    typeof data.mobile !== "string" ||
    !/^(?:\+971|00971|971|0)5\d{8}$/.test(data.mobile.replace(/[\s()-]/g, ""))
  )
    errors.mobile =
      "Please enter a valid UAE mobile number, e.g. +971 50 123 4567.";
  if (
    typeof data.email !== "string" ||
    data.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  )
    errors.email = "Please enter a valid email address.";
  if (
    !data.service ||
    typeof data.service !== "string" ||
    data.service.length > 1000
  )
    errors.service = "Please select a service.";
  if (
    data.services !== undefined &&
    (!Array.isArray(data.services) ||
      data.services.length < 1 ||
      data.services.length > 8 ||
      data.services.some((s) => typeof s !== "string" || s.length > 120))
  )
    errors.service = "Please choose between one and eight services.";
  if (data.consent !== true)
    errors.consent = "Please agree so we can contact you about your request.";
  if (
    data.notes &&
    (typeof data.notes !== "string" || data.notes.length > 2000)
  )
    errors.notes = "Please keep your notes under 2,000 characters.";
  if (
    data.date &&
    (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
      !Number.isFinite(Date.parse(data.date)) ||
      new Date(data.date).toISOString().slice(0, 10) !== data.date)
  )
    errors.date = "Please enter a valid date.";
  if (data.date && earliestDate && !errors.date && data.date < earliestDate)
    errors.date = "Please choose a date on or after " + earliestDate + ".";
  if (data.time && !/^(morning|afternoon|evening)$/.test(data.time))
    errors.time = "Please select a valid time preference.";
  if (
    data.specialist &&
    (typeof data.specialist !== "string" || data.specialist.length > 100)
  )
    errors.specialist = "Please select a valid barber.";
  return errors;
}
