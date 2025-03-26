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
      description: "The main title of your website that appears in the browser tab and as the default title for pages.",
    },
    {
      type: "text",
      name: "siteDescription",
      title: "Site Description",
      description: "A brief description of your website that helps with SEO and appears in search results.",
    },
    {
      type: "image",
      name: "siteLogo",
      title: "Site Logo",
      description: "Your website's logo image that will be used in the header and other prominent places.",
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
                  description: "The text that will be displayed in the navigation menu.",
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
                  description: "The text that will be displayed in the mobile navigation menu.",
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
                  description: "The text that will be displayed in the footer navigation menu.",
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
              description: "The official name of the organization as it should appear on the website.",
            },
            fields.localBusinessType,
            {
              type: "url",
              name: "homepage",
              title: "Home Page URL",
              description: "The main website URL for this organization.",
            },
            {
              type: "object",
              name: "address",
              title: "Address",
              description: "The physical address of the organization.",
              fields: [
                {
                  type: "string",
                  name: "street1",
                  title: "Street",
                  description: "The street address of the organization.",
                },
                {
                  type: "string",
                  name: "street2",
                  title: "Apartment, suite, etc.",
                  description: "Additional address details like apartment number or suite.",
                },
                {
                  type: "string",
                  name: "city",
                  title: "City",
                  description: "The city where the organization is located.",
                },
                {
                  type: "string",
                  name: "state",
                  title: "State",
                  description: "The state or province where the organization is located.",
                },
                {
                  type: "string",
                  name: "zip",
                  title: "Zip",
                  description: "The postal or ZIP code of the organization's address.",
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
