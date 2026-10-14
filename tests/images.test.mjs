import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import sharp from "sharp";
const images = JSON.parse(
  await readFile(new URL("../src/data/image-manifest.json", import.meta.url)),
);
test("all 28 licensed image assets exist and decode with declared dimensions", async () => {
  assert.equal(images.length, 28);
  assert.equal(new Set(images.map((i) => i.src)).size, 28);
  for (const image of images) {
    const file = new URL(`../public${image.src}`, import.meta.url);
    await access(file);
    const metadata = await sharp(await readFile(file)).metadata();
    assert.equal(metadata.format, "webp");
    assert.equal(metadata.width, image.width);
    assert.equal(metadata.height, image.height);
    assert.ok(image.alt.length > 15);
    assert.ok(image.source.startsWith("https://www.pexels.com/photo/"));
    assert.equal(image.license, "https://www.pexels.com/license/");
  }
});
test("provided brand assets and retained grooming photographs match the image manifest", async () => {
  const { providedImages, groomingImages } =
    await import("../src/data/siteImages.ts");
  for (const image of [...providedImages, ...groomingImages]) {
    const metadata = await sharp(
      await readFile(new URL(`../public${image.src}`, import.meta.url)),
    ).metadata();
    assert.equal(metadata.width, image.width);
    assert.equal(metadata.height, image.height);
    assert.ok(image.alt);
    assert.ok(image.license);
  }
});
