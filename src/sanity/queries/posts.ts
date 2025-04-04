import { SanityNextQueries } from "@/types/types.custom";

export default {
  homePosts: `*[_type == "post"][0..2] | order(date desc) {
    ...,
    "slug": slug.current,
    gallery[]{
      ...,
      asset->,
      "alt": asset->.altText,
      "src": asset->.url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
    }
  }`,
  postsPage: `{
      "posts": *[_type == "post"][$start..$end]{
        ...,
        "slug": slug.current,
        gallery[]{
          ...,
          "alt": asset->.altText,
          "src": asset->.url,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
        }
      } | order(date desc),
      "total": count(*[_type == "post"]),
      "start": $start,
      "end": $end
    }`,
  post: `*[_type == "post" && slug.current == $slug][0]{
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
  slugs: `*[_type == "post"]{
      "slug": slug.current,
    }`,
  metadata: `*[_type == "post" && slug.current == $slug][0]{
      title,
      description,
      "openGraph": {
        title,
        description,
        "images": gallery[].asset->.url,
      },
    }`,
} as const satisfies SanityNextQueries
