import { defineField } from "sanity";

export const tags = defineField({
  name: 'tags',
  title: 'Tags',
  type: 'array',
  of: [{
    type: 'reference',
    weak: true,
    to: [{ type: 'tag' }]
  }],
  description: 'Select tags for this post.'
})