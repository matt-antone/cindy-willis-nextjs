import { defineType } from "sanity";
import { FaQuoteLeft } from "react-icons/fa";
import TestimonialPreview from "../../../components/testimonial-preview";
import { ComponentType } from "react";

export const testimonialBlock = defineType({
  name: "testimonialBlock",
  title: "Testimonial",
  type: "object",
  icon: FaQuoteLeft,
  description: "Add a customer testimonial block that includes a quote, author details, and rating. Perfect for showcasing customer feedback, reviews, or social proof.",
  fields: [
    {
      name: "quote",
      title: "Quote",
      type: "text",
      description: "Enter the customer's testimonial text. This will be displayed as the main quote. Keep it concise but impactful.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "author",
      title: "Author",
      type: "object",
      description: "Information about the person giving the testimonial. This helps build credibility and trust.",
      fields: [
        {
          name: "name",
          title: "Name",
          type: "string",
          description: "The full name of the person giving the testimonial. This will be displayed prominently.",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "title",
          title: "Title/Role",
          type: "string",
          description: "The person's professional title or role (e.g., 'CEO', 'Marketing Director'). This adds context to their testimonial.",
        },
        {
          name: "image",
          title: "Author Image",
          type: "image",
          description: "A professional headshot or profile picture of the author. Recommended size: 200x200px. The image will be displayed as a circle.",
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
      description: "A numerical rating from 1 to 5 stars. Use this to visually represent the customer's satisfaction level. 5 stars indicates highest satisfaction.",
      validation: (Rule) => Rule.min(1).max(5),
    },
  ],
  preview: {
    select: {
      quote: "quote",
      author: "author.name",
      rating: "rating",
      image: "author.image.asset.url",
      position: "author.title",
    },
    prepare({ quote, author, rating, image, position }) {
      return {
        quote,
        author: author || "Testimonial",
        media: image,
        rating: rating ? `${rating}/5` : undefined,
        position: position || undefined,
      };
    },
  },
  components: {
    preview: TestimonialPreview as ComponentType<any>,
  },
}); 