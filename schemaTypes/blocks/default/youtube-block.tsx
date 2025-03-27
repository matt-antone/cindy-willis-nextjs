import { defineField, defineType } from "sanity";
import ReactPlayer from "react-player";
import { Box as SanityBox, Text, Flex } from "@sanity/ui";

export const youtubeBlock = defineType({
  name: "youtubeBlock",
  title: "Youtube",
  type: "object",
  description: 'Add a Youtube video by entering the URL to the video.',
  fields: [
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      url: "url",
    },
  },
  components: {
    block: (props: any) => {
      return props.renderDefault({
        ...props,
        renderPreview: () => {
          return (
            <Flex direction="column" gap={4}>
              <Text style={{ fontSize: 12, marginTop: 0 }}>YouTube Preview</Text>
              {props?.value?.url ? (
                <ReactPlayer {...props.value} width={560} height={315} />
              ) : (
                <Text>Please enter a url.</Text>
              )}
            </Flex>
          );
        },
      });
    },
  },
});
