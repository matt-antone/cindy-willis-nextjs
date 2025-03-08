import { defineField } from "sanity";

export const image = defineField({
  name: "image",
  title: "Image",
  type: "image",
  options: {
    hotspot: true
  },
  description: "Add an image. Metadata is stored in the Media Tab. Please enter the metadata there.",
})
