import { defineField } from "sanity";

export const title = defineField({
  name: 'title',
  title: 'Title',
  description: 'Enter the title of the page.',
  validation: Rule => Rule.required(),
  type: 'string',
})