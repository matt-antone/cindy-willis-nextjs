import { defineField } from "sanity";

export const name = defineField({
  title: "Name",
  name: "name",
  type: "object",
  description: 'Enter the full name of the person. This will display in the profile.',
  validation: Rule => Rule.required(),
  fields: [
    {
      title: "Prefix",
      name: "prefix",
      type: "string",
    },
    {
      title: "First Name",
      name: "firstName",
      type: "string",
    },
    {
      title: "Middle Name",
      name: "middleName",
      type: "string",
    },
    {
      title: "Last Name",
      name: "lastName",
      type: "string",
    },
    {
      title: "Suffix",
      name: "suffix",
      type: "string",
    },
  ],
})