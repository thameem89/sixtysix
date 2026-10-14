import { siteImages } from "./siteImages.ts";
export interface Service {
  id: string;
  category: string;
  name: string;
  shortDescription: string;
  description: string;
  duration?: number;
  price?: number;
  from?: boolean;
  preparation?: string;
  aftercare?: string;
  image: string;
  confirmed: boolean;
}
export const categories = [
  {
    id: "hair",
    name: "Haircuts & Styling",
    featuredName: "Signature Haircuts",
    subtitle: "Precision cuts, fades and personalised styling.",
    description:
      "Precision cuts, fades and personalised styling. Your preferences guide every detail.",
    imageKey: "haircut-shaping",
    detailKey: "scissor-detail",
  },
  {
    id: "beard",
    name: "Beard Grooming",
    featuredName: "Beard Grooming",
    subtitle: "Beard trims, shaping and detailing.",
    description:
      "Beard trims, shaping and detailing. Your preferences guide every detail.",
    imageKey: "beard-razor",
    detailKey: "grooming-barber",
  },
  {
    id: "shaving",
    name: "Shaving Rituals",
    featuredName: "Shaving Rituals",
    subtitle: "Classic shaves, hot towels and premium finishing.",
    description:
      "Classic shaves, hot towels and premium finishing. Your preferences guide every detail.",
    imageKey: "shave-classic",
    detailKey: "shaving-tools",
  },
  {
    id: "scalp",
    name: "Hair & Scalp Treatments",
    featuredName: "Hair & Scalp Care",
    subtitle: "Professional treatments and scalp care.",
    description:
      "Professional treatments and scalp care. Your preferences guide every detail.",
    imageKey: "hair-wash",
    detailKey: "scalp-wash",
  },
  {
    id: "skin",
    name: "Men’s Skincare",
    featuredName: "Men’s Skin & Face",
    subtitle: "Cleansing, facials and refreshing skincare treatments.",
    description:
      "Cleansing, facials and refreshing skincare treatments. Your preferences guide every detail.",
    imageKey: "facial-mask",
    detailKey: "facial-care",
  },
  {
    id: "packages",
    name: "Grooming Packages",
    featuredName: "Complete Grooming",
    subtitle: "Curated packages and personal grooming services.",
    description:
      "Curated packages and personal grooming services. Your preferences guide every detail.",
    imageKey: "haircut-shaping",
    detailKey: "towel-ritual",
  },
].map((c) => ({ ...c, image: siteImages[c.imageKey].src }));
export const featuredCategoryIds = [
  "hair",
  "beard",
  "shaving",
  "scalp",
  "skin",
  "packages",
];
const raw: [string, string][] = [
  ["hair", "Signature Haircut"],
  ["hair", "Classic Haircut"],
  ["hair", "Skin Fade"],
  ["hair", "Taper Fade"],
  ["hair", "Scissor Cut"],
  ["hair", "Buzz Cut"],
  ["hair", "Hair Wash & Styling"],
  ["hair", "Hair Styling"],
  ["beard", "Beard Trim"],
  ["beard", "Beard Shaping"],
  ["beard", "Beard Sculpting"],
  ["beard", "Beard Line-Up"],
  ["beard", "Beard Conditioning"],
  ["shaving", "Classic Shave"],
  ["shaving", "Hot Towel Shave"],
  ["shaving", "Head Shave"],
  ["shaving", "Premium Shaving Ritual"],
  ["scalp", "Scalp Cleansing"],
  ["scalp", "Scalp Massage"],
  ["scalp", "Deep Conditioning"],
  ["scalp", "Hair Repair Treatment"],
  ["scalp", "Hair & Scalp Consultation"],
  ["skin", "Express Facial"],
  ["skin", "Deep Cleansing Facial"],
  ["skin", "Hydrating Facial"],
  ["skin", "Men’s Signature Facial"],
  ["packages", "Haircut & Beard Trim"],
  ["packages", "Haircut & Classic Shave"],
  ["packages", "Executive Grooming"],
  ["packages", "Complete Grooming Experience"],
];
export const services: Service[] = raw.map(([category, name], i) => ({
  id: `service-${i + 1}`,
  category,
  name,
  shortDescription: categories.find((c) => c.id === category)!.subtitle,
  description: `${name}, tailored to your preferences through a personal consultation. This is an illustrative preview; our final service menu will be confirmed before opening.`,
  image: siteImages[categories.find((c) => c.id === category)!.detailKey].src,
  confirmed: false,
}));
// Configurable additional grooming entries stay unpublished until client confirmation.
export const unpublishedAdditionalServices = [
  "Eyebrow Grooming",
  "Nose/Ear Grooming",
  "Men’s Manicure",
  "Men’s Pedicure",
].map((name) => ({
  name,
  category: "additional",
  published: false,
  confirmed: false,
}));
export function servicePrice(service: Service) {
  return service.confirmed && service.price !== undefined
    ? `${service.from ? "From " : ""}AED ${service.price}`
    : "Price on request";
}
