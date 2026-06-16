import { Metadata } from "next";
import NotFound from "@/components/other-pages/404/NotFound";
export const metadata: Metadata = {
  title: "404 | Azurio - Digital Agency & Portfolio NextJs Template",
  description: "Azurio - Digital Agency & Portfolio NextJs Template",
};
export default function NotFoundPage() {
  return (
    <>
      <NotFound />
    </>
  );
}
