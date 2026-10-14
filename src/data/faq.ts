import { salonConfig } from "./salon";
export const faqs = [
  {
    question: "When will SIXTY SIX open?",
    answer: salonConfig.bookingEnabled
      ? "The studio is accepting appointment enquiries. Our team will contact you to confirm availability."
      : `We’re scheduled to open in ${salonConfig.openingLabel}. The exact opening day will be announced once confirmed.`,
  },
  {
    question: "Where will the studio be located?",
    answer: `Our launch poster identifies ${salonConfig.address}. Detailed arrival information will be shared before opening.`,
  },
  {
    question: "How can I enquire about an appointment?",
    answer:
      "Use the appointment interest form to share the services you have in mind. Requests are subject to team confirmation; there is no live availability calendar. Online submissions become available once our enquiry service is connected.",
  },
  {
    question: "What services will be available?",
    answer:
      "Explore our illustrative preview of men’s haircuts, beard grooming, shaving rituals, hair and scalp care, men’s skincare and grooming packages. The final menu will be confirmed before opening.",
  },
  {
    question: "How will I receive opening updates?",
    answer:
      "Once online enquiries are enabled, join the priority list and consent to receive launch updates. Until then, the form will clearly tell you that your details have not been sent or saved.",
  },
  {
    question: "Will pricing be announced before opening?",
    answer:
      "The final service menu and prices will be confirmed before opening. Prices currently shown as “on request” have not yet been supplied.",
  },
];
