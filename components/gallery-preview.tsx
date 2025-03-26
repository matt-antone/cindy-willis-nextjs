import * as React from 'react';
import { Box, Card, Flex, Stack, Text, Grid } from "@sanity/ui";

export const GalleryPreview: React.FunctionComponent<any> = (props) => {
  console.log(props)
  return (
    <Box>
      <Text size={props.usePageGallery ? 3 : 2}>{props.usePageGallery ? "Gallery Block Using Page Gallery" : "Gallery Block"}</Text>
      <Box marginTop={2} marginBottom={2}>
        {
          props.images && props.images[0] &&
          <img src={`${props.images[0].asset.url}?w=640&h=480&fit=crop`} alt="Gallery Image" width={640} height={480} style={{ objectFit: "cover", width: "100%", height: "auto" }} />
        }
      </Box>
      <Grid gap={2} columns={props.images?.length > 1 ? props.images.length : 1}>
        {
          props.images?.length > 1 && props.images.map((image: any, index: number) => {
            return (
              <img src={`${image.asset.url}?w=640&h=480&fit=crop`} alt="Gallery Image" width={640} height={480} style={{ objectFit: "cover", width: "100%", height: "auto" }} />
            )
          })
        }
      </Grid>
    </Box >
  );
};

export default GalleryPreview;
