import { SanityNextQueries } from "../../types/types.custom";

export default {
  pages: `
    *[_type == "page"]{
      ...,
      "slug": slug.current,
      gallery[]{
        ...,
        "alt": asset->.altText,
        "src": asset->.url,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
      }
    }`,
  slugs: `*[_type == "page"][]{
    "slug": slug.current,
  }`,
  page: `
    *[_type == "page" && slug.current == $slug][0]{
      ...,
      "slug": slug.current,
      gallery[]{
        ...,
        "alt": asset->.altText,
        "src": asset->.url,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
      }
    }`,
  metadata: `
    *[_type == "page" && slug.current == $slug][0]{
      title,
      description,
      "openGraph": {
        title,
        description,
        "images": gallery[].asset->.url,
      },
    }`,
} as const satisfies SanityNextQueries
