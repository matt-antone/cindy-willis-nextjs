import React from 'react'
import { Grid, Flex, Text, Box } from '@sanity/ui'
import { client } from '../sanity/lib/client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

export const FeaturesPreview = ({ features, heading }: any) => {
  console.log({ features })
  return (
    <Box width="100%" padding={2}>
      <Text size={2} weight="semibold">{heading || "no heading"}</Text>
      <Grid width="100%" columns={Object.keys(features).length} gap={2} padding={2}>
        {Object.keys(features).map((feature: keyof typeof features) => {
          console.log(features[feature])
          console.log(urlFor(features[feature].icon).url())
          return features[feature] && (
            <Flex padding={2} direction="column" gap={2} width="100%">
              <img src={urlFor(features[feature].icon).width(100).height(100).fit('max').auto('format').url()} alt={features[feature].title} />
              <Text align="center" size={1} weight="semibold">{features[feature].title}</Text>
              <Text align="center" size={1}>{features[feature].description}</Text>
            </Flex>
          )
        })}
      </Grid>
    </Box>
  )
} 