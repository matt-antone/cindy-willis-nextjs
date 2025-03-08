import { defineField } from "sanity";

export const description = defineField({
  name: 'description',
  title: 'Description',
  type: 'text',
  rows: 4,
  description: 'Add a description to the page. This will be used as the meta description for SEO.',
  validation: Rule => Rule.required(),
})