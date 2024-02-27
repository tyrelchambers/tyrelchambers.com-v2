import { createClient } from "@sanity/client";

const dataset =
  process.env.NODE_ENV === "production" ? "production" : "development";

export const sanityServerClient = createClient({
  token: process.env.SANITY_TOKEN,
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-05-27",
  useCdn: false,
});
