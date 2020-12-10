import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "tn3zufrg",
  dataset: "production",
  useCdn: "true",
});
