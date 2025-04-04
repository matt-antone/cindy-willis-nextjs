import { defineField } from 'sanity';
import { gallery, image } from './index';

const templates = ["hero", "content", "gallery", "contact", "carousel", "bento"]

export const sections: any = defineField({
  name: "sections",
  title: "Sections",
  description: 'Add content sections to the page.',
  type: "array",
  of: [
    {
      type: "object",
      name: "section",
      title: "Section",
      preview: {
        select: {
          name: "name",
          template: "template",
          media: "gallery.0.asset",
        },
        prepare(selection) {
          return { ...selection, title: selection.name, subtitle: selection.template };
        },
      },
      fields: [
        {
          name: "name",
          type: "string",
          title: "Name",
          description: "Used to identify this section. Is not displayed on the page.",
          validation: Rule => Rule.required(),
        },
        {
          name: "template",
          type: "string",
          title: "Template",
          description: "Pick a template to use for this section.",
          options: {
            list: templates,
          },
        },
        // {
        //   name: "title",
        //   type: "string",
        //   title: "Title",
        //   description: "Used to identify this section. Is not displayed on the page.",
        //   hidden: ({ parent }) => { return typeof parent?.template === "undefined" },
        // },
        {
          ...image,
          hidden: ({ parent }) => { console.log("image field", parent?.template); return typeof parent?.template === "undefined" || !['hero', 'bento'].includes(parent?.template) }
        },
        {
          name: "content",
          type: "blockContent",
          title: "Content",
          hidden: ({ parent }) => { return typeof parent?.template === "undefined" || !['bento', 'content', 'hero'].includes(parent?.template) },
        },
        {
          ...gallery,
          title: "Images",
          hidden: ({ parent }) => { return typeof parent?.template === "undefined" || !['carousel', 'gallery'].includes(parent?.template) }
        },
        {
          name: "reverse",
          type: "boolean",
          title: "Reverse",
          description: "Reverse the order of the columns.",
          hidden: ({ parent }) => { return typeof parent?.template === "undefined" || !['bento'].includes(parent?.template) },
        },
      ],
    },
  ],
})