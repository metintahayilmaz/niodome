import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

/**
 * Sanity image asset nesnesini optimize edilmiş URL'e dönüştürür.
 *
 * Kullanım:
 *   urlFor(item.cursorImageSrc).width(500).height(500).url()
 *   urlFor(item.coverImage).auto("format").url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
