import type { SanityNextQueries } from "../../types/types.custom"

export default {
  links: `{
      "pages": *[_type == "page"]{
        title,
        slug,
        description,
      },
      "posts": *[_type == "post"]{
        title,
        slug,
        description,
      }
    }`,
} as const satisfies SanityNextQueries
