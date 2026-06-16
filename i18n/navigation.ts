import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Bu wrapper'lar next/navigation'ın yerine geçer.
// Risk 1 (GSAP/Lenis usePathname): bileşenler next/navigation'dan değil
// buradan import etmeli — locale prefix soyutlanmış pathname döner.
// Bağlama: Adım 3'te bileşenler taşınırken yapılacak.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
