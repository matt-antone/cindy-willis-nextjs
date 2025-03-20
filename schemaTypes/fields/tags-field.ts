import { defineField } from "sanity";

export const tags = defineField({
  name: 'tags',
  title: 'Tags',
  type: 'tags',
  options: {
    includeFromRelated: 'tags',
  },
  description: 'Select tags for this post.'
})