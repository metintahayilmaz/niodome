import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
const root = new URL("../", import.meta.url);
const catalog = JSON.parse(readFileSync(new URL("data/serviceCatalog.json", root)));
const artwork = JSON.parse(readFileSync(new URL("data/serviceArtwork.json", root)));
test("every service has its own existing, distinct portrait artwork", () => {
  const hashes = new Set();
  for (const service of catalog) {
    const asset = artwork[service.id];
    assert.ok(asset, `Missing artwork: ${service.id}`);
    const bytes = readFileSync(new URL(`public${asset.src}`, root));
    assert.equal(bytes.toString("ascii", 8, 12), "WEBP");
    assert.ok(asset.width >= 800 && asset.height >= 1000);
    assert.ok(asset.width / asset.height >= 0.6 && asset.width / asset.height <= 1.1);
    const hash = createHash("sha256").update(bytes).digest("hex");
    assert.ok(!hashes.has(hash), `Duplicate artwork: ${service.id}`);
    hashes.add(hash);
  }
});
