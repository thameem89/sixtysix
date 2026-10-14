import manifest from "./image-manifest.json" with { type: "json" };
export interface SiteImage {
  key: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  photographer: string;
  source: string;
  license: string;
  illustrative: boolean;
  position: string;
  loading: string;
}
export const providedImages: SiteImage[] = [
  {
    key: "logo",
    src: "/images/logo.webp",
    alt: "SIXTY SIX — Men’s Grooming Lounge official logo",
    width: 400,
    height: 400,
    photographer: "Client supplied",
    source: "Client supplied logo",
    license: "Provided for this project",
    illustrative: false,
    position: "50% 50%",
    loading: "eager",
  },
  {
    key: "launchPoster",
    src: "/images/launch-poster.webp",
    alt: "SIXTY SIX official coming-soon launch poster",
    width: 1050,
    height: 600,
    photographer: "Client supplied",
    source: "Client supplied launch poster",
    license: "Provided for this project",
    illustrative: false,
    position: "50% 50%",
    loading: "lazy",
  },
];
export const groomingImages: SiteImage[] = [
  {
    key: "grooming-barber",
    src: "/images/editorial/grooming-barber.webp",
    alt: "A traditional beard trim carefully finished by hand",
    width: 1600,
    height: 1066,
    photographer: "Unsplash contributor",
    source: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
    license: "https://unsplash.com/license",
    illustrative: true,
    position: "50% 35%",
    loading: "lazy",
  },
  {
    key: "grooming-tools",
    src: "/images/editorial/grooming-tools.webp",
    alt: "Professional barber clippers and scissors on a wooden surface",
    width: 1100,
    height: 733,
    photographer: "Unsplash contributor",
    source: "https://images.unsplash.com/photo-1621605815971-fbc98d665033",
    license: "https://unsplash.com/license",
    illustrative: true,
    position: "50% 50%",
    loading: "lazy",
  },
];
export const siteImages = Object.fromEntries(
  [...manifest, ...groomingImages, ...providedImages].map((image) => [
    image.key,
    image,
  ]),
) as Record<string, SiteImage>;
export const imageGroups = {
  hero: ["portrait-blue", "portrait-cufflinks"],
  introduction: ["lounge-interior", "tools-dark"],
  experience: ["barber-chair", "barber-station", "hair-wash"],
  gallery: [
    "haircut-scissor",
    "beard-razor",
    "towel-ritual",
    "haircut-style",
    "facial-towel",
    "portrait-classic",
    "tools-wood",
    "clipper-detail",
    "haircut-precision",
  ],
  story: ["tool-holster", "facial-care", "scissor-towel"],
};
