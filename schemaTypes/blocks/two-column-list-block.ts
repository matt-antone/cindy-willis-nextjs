import { defineField, defineType } from "sanity";
import { TwoColumnListPreview } from "../../components/two-column-list-preview";
export const twoColumnList = defineType({
  name: "twoColumnList",
  title: "Two Column List",
  type: "object",
  description: 'Add a heading with a list that displays in two columns',
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "List Items",
      type: "array",
      of: [{ type: "string" }],
      description: "Items will automatically display in two balanced columns",
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      heading: "heading",
      items: "items",
    },
    prepare({ heading, items = [] }) {
      const itemCount = items.length;
      const subtitle = itemCount === 1
        ? '1 item'
        : `${itemCount} items`;

      return {
        title: heading || 'Two Column List',
        subtitle: subtitle,
        items: items || [],
      };
    },
  },
  components: {
    preview: TwoColumnListPreview,
  },
});