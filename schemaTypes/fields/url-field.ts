import { defineField } from "sanity";

export const url = defineField({
  name: "url",
  title: "URL",
  type: "url",
  description: "Enter the URL.",
  validation: Rule =>
    Rule.uri({
      scheme: ["http", "https"],
    }),
})
