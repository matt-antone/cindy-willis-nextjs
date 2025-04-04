import { SanityNextQueries } from "@/types/types.custom";

export default {
  settings: `*[_type == "settings"][0]{
        ...,
      }`,
  siteTitle: `*[_type == "settings"][0].siteTitle`,
  logo: `{"logo": *[_type == "settings"][0].siteLogo{
        ...,
        "alt": asset->.altText,
        "src": asset->.url,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
      }
  }
      `,
  mainMenu: `*[_type == "settings"][0].navigation.desktop`,
  mobileMenu: `*[_type == "settings"][0].navigation.mobile`,
  footerMenu: `*[_type == "settings"][0].navigation.footer`,
} as const satisfies SanityNextQueries
