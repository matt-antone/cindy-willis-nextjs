import { defineType } from "sanity";


export const imageblock = defineType({
  name: "imageblock",
  title: "Image Block",
  type: "image",
  preview: {
    select: {
      image: "image.asset.url",
    },
    prepare({ image }) {
      return {
        title: "Image",
        image,
      }
    }
  },
});
