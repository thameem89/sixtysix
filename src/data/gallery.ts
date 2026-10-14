import { imageGroups, siteImages } from "./siteImages";
const details: [string, string][] = [
  ["Craft", "The precision cut"],
  ["Rituals", "The art of the shave"],
  ["Rituals", "The hot towel ritual"],
  ["Craft", "A considered shape"],
  ["Rituals", "A moment of care"],
  ["Portraits", "Classic character"],
  ["Details", "Tools of the craft"],
  ["Details", "The finishing tools"],
  ["Craft", "Precision in practice"],
];
export const gallery = imageGroups.gallery.map((key, i) => ({
  key,
  src: siteImages[key].src,
  alt: siteImages[key].alt,
  category: details[i][0],
  label: details[i][1],
}));
export const team: {
  name: string;
  specialty: string;
  experience: string;
  image: string;
  description: string;
  published: boolean;
}[] = [];
export const testimonials: { quote: string; name: string }[] = [];
export const productBrands: string[] = [];
