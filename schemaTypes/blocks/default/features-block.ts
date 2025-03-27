import { defineType } from "sanity";
import FeaturesPreview from "../../../components/features-preview";
import { ComponentType } from "react";
export const featuresBlock = defineType({
  name: "featuresBlock",
  title: "Features",
  type: "object",
  fields: [
    {
      name: "heading",
      title: "Heading",
      type: "string",
    },
    {
      name: "features",
      title: "Features",
      type: "array",
      options: {
        layout: "grid",
      },
      of: [{
        type: "object",
        fields: [
          {
            name: "icon",
            title: "Icon",
            type: "image",
          },
          { name: "title", title: "Title", type: "string" },
          { name: "description", title: "Description", type: "text" },
        ],
      },
      ],
    },
  ],
  preview: {
    select: {
      heading: "heading",
      features: "features",
    },
    prepare({ heading, features }) {
      console.log({ features })
      return {
        title: heading,
        features,
      }
    }
  },
  components: {
    preview: FeaturesPreview as ComponentType<any>,
  },
});