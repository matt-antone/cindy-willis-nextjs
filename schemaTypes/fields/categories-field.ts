import { defineField } from "sanity";

export const categories = defineField({
  name: 'category',
  title: 'Category',
  type: 'reference',
  weak: true,
  to: [{ type: 'category' }],
  description: 'Select a category for this post.'
})