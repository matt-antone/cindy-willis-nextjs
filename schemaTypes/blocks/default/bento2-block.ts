import { defineType } from "sanity";
import { Bento2Preview } from '../../../components/bento2-preview'
import { toHTML } from '@portabletext/to-html'

export const bento2Block = defineType({
  name: "bento2Block",
  title: "Bento 2",
  type: "object",
  fields: [
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    {
      name: "reverse",
      title: "Reverse",
      type: "boolean",
    },
  ],
  preview: {
    select: {
      content: "content",
      image: "image.asset.url",
      reverse: "reverse"
    },
    prepare({ content, image, reverse }) {
      return {
        title: "Bento 2",
        image,
        reverse,
        content: toHTML(content) as any,
      }
    }
  },
  components: {
    preview: Bento2Preview
  }
});
