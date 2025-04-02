import React from 'react'
import { Grid, Flex, Text, Box } from '@sanity/ui'
import { client } from '../sanity/lib/client'
import imageUrlBuilder from '@sanity/image-url'
import { v4 as uuidv4 } from 'uuid';

const builder = imageUrlBuilder(client)

interface IFeaturesPreviewProps {
  features: IFeature[];
  heading: string;
}

interface IFeature {
  title: string;
  description: string;
  icon: {
    asset: { url: string }
  }
}

const FeaturesPreview: React.FunctionComponent<IFeaturesPreviewProps> = (props) => {
  const { features, heading } = props;
  return (
    <Box width="100%" padding={2}>
      <Text size={2} weight="semibold" align="center">{heading || "no heading"}</Text>
      <Grid width="100%" columns={features.length} gap={2} padding={2}>
        {features.map((feature, index) => {

          const iconUrl = builder.image(feature.icon.asset).url();
          return (
            <Flex key={uuidv4()} padding={2} direction="column" align="center" gap={4} width="100%">
              {iconUrl && (
                <img src={iconUrl} alt={feature.title} width={100} height={100} />
              )}
              <Text align="center" size={1} weight="semibold">{feature.title}</Text>
              <Text align="center" size={1}>{feature.description}</Text>
            </Flex>
          )
        })}
      </Grid>
    </Box>
  )
};

export default FeaturesPreview;