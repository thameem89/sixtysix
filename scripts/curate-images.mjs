import fs from "node:fs/promises";
import sharp from "sharp";
const items = [
  [
    "portrait-suit",
    4033968,
    "A bearded gentleman in a black suit",
    "cottonbro studio",
  ],
  ["portrait-blue", 5728024, "A bearded gentleman in a blue suit", "Abhishek"],
  [
    "portrait-cufflinks",
    28513052,
    "A gentleman adjusting his cufflinks against a dark backdrop",
    "Alax Matias",
  ],
  [
    "portrait-beard",
    10125394,
    "Monochrome portrait of a gentleman with a carefully groomed beard",
    "El gringo photo",
  ],
  [
    "haircut-close",
    10003357,
    "A barber carefully trimming a man’s beard",
    "Jonathan Cooper",
  ],
  [
    "haircut-scissor",
    12464843,
    "Precision scissor cutting on a male client",
    "izzet çakallı",
  ],
  [
    "beard-razor",
    7447140,
    "A barber detailing a man’s beard with a razor",
    "Gustavo Fring",
  ],
  [
    "haircut-shaping",
    9992818,
    "A barber shaping a male client’s haircut",
    "Alex Urezkov",
  ],
  [
    "haircut-precision",
    7518735,
    "A precise men’s haircut in progress",
    "Pavel Danilyuk",
  ],
  [
    "lounge-interior",
    4969835,
    "A refined barbershop with leather chairs and large mirrors",
    "Maria Orlova",
  ],
  [
    "barber-chair",
    3993296,
    "A black leather barber chair in a contemporary barbershop",
    "cottonbro studio",
  ],
  [
    "barber-station",
    8867485,
    "A male client receiving a soothing towel treatment",
    "Los Muertos Crew",
  ],
  [
    "haircut-style",
    7447132,
    "A barber cutting and shaping a man’s hair",
    "Gustavo Fring",
  ],
  [
    "scissor-detail",
    12464846,
    "A barber carefully detailing a man’s neckline with a razor",
    "izzet çakallı",
  ],
  [
    "hair-wash",
    7447131,
    "A male client receiving a professional hair wash",
    "Gustavo Fring",
  ],
  [
    "shave-classic",
    8867551,
    "A classic straight-razor shave for a male client",
    "Los Muertos Crew",
  ],
  [
    "towel-ritual",
    7447149,
    "A male client enjoying a hot towel treatment",
    "Gustavo Fring",
  ],
  [
    "shaving-tools",
    995300,
    "A straight razor, shaving brush and mug",
    "Josh Sorenson",
  ],
  [
    "tool-holster",
    7697208,
    "Professional barber equipment in close detail",
    "RDNE Stock project",
  ],
  [
    "clipper-detail",
    10775074,
    "Barber scissors and clippers on a textured surface",
    "Vitaly Gorbachev",
  ],
  [
    "facial-mask",
    18704463,
    "A barber applying a facial mask to a male client",
    "Macrookai filmmaker",
  ],
  [
    "facial-care",
    27497967,
    "A man receiving a facial and head treatment",
    "Clark Enzzo",
  ],
  [
    "facial-towel",
    12302331,
    "A man receiving a hot towel facial treatment",
    "Jonathan Cooper",
  ],
  [
    "scalp-wash",
    17553843,
    "Professional hair and scalp washing for a male client",
    "Luis Quintero",
  ],
  [
    "portrait-classic",
    2714273,
    "A gentleman with a groomed beard in monochrome",
    "Yasin Gündogdu",
  ],
  [
    "scissor-towel",
    8834066,
    "Professional scissors displayed at a barber station",
    "Kampus Production",
  ],
  [
    "tools-dark",
    8552626,
    "Clippers, scissors and comb on a dark surface",
    "Ej Agumbay",
  ],
  [
    "tools-wood",
    20785314,
    "Barber scissors and shavers arranged on a wooden table",
    "František Čaník",
  ],
];
await fs.mkdir("public/images/grooming", { recursive: true });
const output = [];
let cursor = 0;
async function worker() {
  while (cursor < items.length) {
    const [key, id, alt, photographer] = items[cursor++];
    const file = `public/images/grooming/${key}.webp`;
    try {
      await fs.access(file);
    } catch {
      const response = await fetch(
        `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${key === "portrait-cufflinks" ? 2200 : 1400}`,
      );
      if (!response.ok) throw new Error(`${key}: ${response.status}`);
      await sharp(Buffer.from(await response.arrayBuffer()))
        .rotate()
        .resize({
          width: key === "portrait-cufflinks" ? 2200 : 1400,
          withoutEnlargement: true,
        })
        .webp({ quality: 82 })
        .toFile(file);
    }
    const metadata = await sharp(file).metadata();
    output.push({
      key,
      id,
      src: `/images/grooming/${key}.webp`,
      alt,
      photographer,
      width: metadata.width,
      height: metadata.height,
      source: `https://www.pexels.com/photo/${id}/`,
      license: "https://www.pexels.com/license/",
      illustrative: true,
      position: "50% 40%",
      loading: "lazy",
    });
    console.log(key);
  }
}
await Promise.all(Array.from({ length: 5 }, worker));
output.sort(
  (a, b) =>
    items.findIndex((i) => i[0] === a.key) -
    items.findIndex((i) => i[0] === b.key),
);
await fs.writeFile(
  "src/data/image-manifest.json",
  JSON.stringify(output, null, 2) + "\n",
);
