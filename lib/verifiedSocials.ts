import registry from "@/data/verifiedSocials.json";
import type { SocialLinkItem } from "@/types/siteSettings";

// Add a profile only after Niodome ownership and the public URL are verified.
export const verifiedSocials: SocialLinkItem[] = registry;

export function getVerifiedSocials(
  candidates?: SocialLinkItem[],
): SocialLinkItem[] {
  if (!candidates?.length) return verifiedSocials;
  const verifiedUrls = new Set(verifiedSocials.map((s) => s.href));
  return candidates.filter((s) => verifiedUrls.has(s.href));
}
