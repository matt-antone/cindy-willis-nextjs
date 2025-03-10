import { defineType } from "sanity";
import { GrSettingsOption } from "react-icons/gr";
import * as fields from "../fields";

const validateUrlOrPath = (url: string) => {
  // Check for anchor-only link
  if (url && url.startsWith('#')) {
    return true; // Valid anchor link
  }
  // Check for absolute path (with optional anchor)
  if (url && url.startsWith('/')) {
    return true; // Valid absolute path
  }
  try {
    new URL(url);
    return true; // Valid URL
  } catch (e) {
    return 'Must be either an absolute path (starting with "/"), an anchor link (starting with "#"), or a valid URL';
  }
};

export const settings = defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: GrSettingsOption,
  description: 'Settings for the site.',
  fields: [
    {
      type: "string",
      name: "siteTitle",
      title: "Site Title",
    },
    {
      type: "text",
      name: "siteDescription",
      title: "Site Description",
    },
    {
      type: "image",
      name: "siteLogo",
      title: "Site Logo",
      options: {
        hotspot: true,
      },
    },
    {
      type: "object",
      name: "navigation",
      title: "Navigation",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          type: "array",
          name: "desktop",
          title: "Desktop Navigation",
          options: {
            collapsible: true,
            collapsed: true,
          },
          of: [
            {
              type: "object",
              name: "item",
              title: "Item",
              fields: [
                {
                  type: "string",
                  name: "label",
                  title: "Label",
                },
                {
                  type: "string",
                  name: "url",
                  title: "Url",
                  description: "Path to the page or external url.",
                  validation: (Rule) => Rule.required().custom(validateUrlOrPath),
                },
              ],
            },
          ],
        },
        {
          type: "array",
          name: "mobile",
          title: "Mobile Navigation",
          options: {
            collapsible: true,
            collapsed: true,
          },
          of: [
            {
              type: "object",
              name: "item",
              title: "Item",
              fields: [
                {
                  type: "string",
                  name: "label",
                  title: "Label",
                },
                {
                  type: "string",
                  name: "url",
                  title: "Url",
                  description: "Path to the page or external url.",
                  validation: (Rule) => Rule.required().custom(validateUrlOrPath),
                },
              ],
            },
          ],
        },
        {
          type: "array",
          name: "footer",
          title: "Footer Navigation",
          options: {
            collapsible: true,
            collapsed: true,
          },
          of: [
            {
              type: "object",
              name: "item",
              title: "Item",
              fields: [
                {
                  type: "string",
                  name: "label",
                  title: "Label",
                },
                {
                  type: "string",
                  name: "url",
                  title: "Url",
                  description: "Path to the page or external url.",
                  validation: (Rule) => Rule.required().custom(validateUrlOrPath),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "array",
      name: "organizations",
      title: "Organizations",
      of: [
        {
          type: "object",
          name: "organization",
          title: "Organization",
          fields: [
            {
              type: "string",
              name: "label",
              title: "Label",
              description: "Used to identify this organization in sanity.",
            },
            {
              type: "string",
              name: "name",
              title: "Name",
            },
            fields.localBusinessType,
            {
              type: "url",
              name: "homepage",
              title: "Home Page URL",
            },
            {
              type: "object",
              name: "address",
              title: "Address",
              fields: [
                {
                  type: "string",
                  name: "street1",
                  title: "Street",
                },
                {
                  type: "string",
                  name: "street2",
                  title: "Apartment, suite, etc.",
                },
                {
                  type: "string",
                  name: "city",
                  title: "City",
                },
                {
                  type: "string",
                  name: "state",
                  title: "State",
                },
                {
                  type: "string",
                  name: "zip",
                  title: "Zip",
                },
              ],
            },
            fields.phone,
            fields.email,
            fields.gallery,
          ],
          preview: {
            select: {
              title: "label",
            },
            prepare(selection) {
              return { ...selection };
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "siteTitle",
    },
    prepare(selection) {
      return { ...selection };
    },
  },
});
