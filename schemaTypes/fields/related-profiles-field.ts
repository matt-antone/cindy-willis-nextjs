import { defineField } from "sanity";

export const relatedProfiles = defineField({
  name: 'relatedProfiles',
  title: 'Related Profiles',
  type: 'array',
  of: [{
    type: 'reference',
    weak: true,
    to: [{ type: 'profile' }]
  }],
  description: 'Select related profiles.'
})