import type { SanityNextQueries } from "../../types/types.custom"

export default {
  page: `
      *[_type == "home"][0]{
        ...,
        gallery[]{
          ...,
          "alt": asset->.altText,
          "src": asset->.url,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
        },
      }`,
  metadata: `
      *[_type == "home"][0]{
        title,
        description,
        "openGraph": {
          title,
          description,
          "images": gallery[].asset->.url,
        },
      }`,
} as const satisfies SanityNextQueries
