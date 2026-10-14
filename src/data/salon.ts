export const salonConfig = {
  name: "SIXTY SIX",
  logo: "/images/logo.webp",
  tagline: "Men’s Grooming Lounge",
  phone: "",
  whatsapp: "",
  email: "",
  instagram: "",
  address: "Helio 2, Al Zahia, Ajman, United Arab Emirates",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Helio+2+Al+Zahia+Ajman+UAE",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "",
  launchDate: "", // Set only when the exact opening day is confirmed.
  openingLabel: "January 2027",
  currency: "AED",
  bookingEnabled: false,
  priorityListEnabled: true,
  showTestimonials: false,
  hideLaunchAnnouncementAfterDate: true,
  openingHours: "Opening hours will be announced before launch.",
  parking: "",
  pricesConfirmed: false,
};
export function launchState(now = Date.now()) {
  return {
    prelaunch: !salonConfig.bookingEnabled,
    showCountdown:
      !salonConfig.bookingEnabled &&
      Boolean(salonConfig.launchDate) &&
      Number.isFinite(Date.parse(salonConfig.launchDate)) &&
      now < Date.parse(salonConfig.launchDate),
  };
}
export function whatsappUrl(service?: string) {
  if (!salonConfig.whatsapp) return null;
  return `https://wa.me/${salonConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(service ? `Hello, I'm interested in the ${service} service and would like more information.` : "Hello, I would like to know more about SIXTY SIX Men’s Grooming Lounge.")}`;
}
export function track(name: string, detail?: Record<string, string>) {
  if (typeof window !== "undefined")
    window.dispatchEvent(
      new CustomEvent("salon:analytics", { detail: { name, ...detail } }),
    );
}

export function earliestAppointmentDate() {
  return salonConfig.bookingEnabled
    ? new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Dubai",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date())
    : salonConfig.launchDate
      ? salonConfig.launchDate.slice(0, 10)
      : "2027-01-01";
}
