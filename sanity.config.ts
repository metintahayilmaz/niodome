import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import type { StructureBuilder } from "sanity/structure";
import {
  siteSettings,
  heroSettings,
  service,
  project,
  processStep,
  testimonial,
  post,
  teamMember,
  serviceDetail,
} from "./sanity/schemas";

/** Singleton türleri — Studio'da yalnızca bir doküman olarak görünür */
const SINGLETONS = ["siteSettings", "heroSettings"] as const;

const defaultDocumentNode = (S: StructureBuilder) =>
  S.document().views([S.view.form()]);

const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Singleton belgeler
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Hero Settings")
        .id("heroSettings")
        .child(S.document().schemaType("heroSettings").documentId("heroSettings")),
      S.divider(),
      // Normal belge türleri
      ...["service", "project", "processStep", "testimonial", "post", "teamMember", "serviceDetail"].map((type) =>
        S.documentTypeListItem(type)
      ),
    ]);

export default defineConfig({
  name: "azurio-studio",
  title: "Azurio Studio",
  basePath: "/studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool({ structure, defaultDocumentNode }),
    visionTool(),
  ],

  schema: {
    types: [siteSettings, heroSettings, service, project, processStep, testimonial, post, teamMember, serviceDetail],
    // Singleton türleri için yeni belge oluşturmayı engelle
    templates: (prev) =>
      prev.filter(({ schemaType }) => !(SINGLETONS as readonly string[]).includes(schemaType)),
  },
});
