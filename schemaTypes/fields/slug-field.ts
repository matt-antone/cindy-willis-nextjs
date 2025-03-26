import { defineField } from "sanity";

export const slug = defineField({
  name: 'slug',
  title: 'Slug',
  type: 'slug',
  description: 'The URL-friendly version of the title. This will be used in the page URL.',
  validation: Rule => Rule.required(),
  options: {
    source: 'title',
    maxLength: 96,
  },
})