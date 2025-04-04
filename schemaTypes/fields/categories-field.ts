import { defineField } from "sanity";

export const categories = defineField({
  name: 'categories',
  title: 'Categories',
  type: 'tags',
  options: {
    includeFromRelated: 'categories',
  },
  description: 'Select a category for this post.'
})