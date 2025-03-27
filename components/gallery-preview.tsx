import * as React from 'react';
import { Box, Card, Flex, Stack, Text, Grid } from "@sanity/ui";

export const GalleryPreview: React.FunctionComponent<any> = (props) => {
  console.log(props)
  const [currentIndex, setCurrentIndex] = React.useState(0);
  return (
    <Box>
      <Text size={props.usePageGallery ? 3 : 2}>{props.usePageGallery ? "Gallery Block Using Page Gallery" : "Gallery Block"}</Text>
      <Box marginTop={2} marginBottom={2}>
        {
          props.images && props.images[0] &&
          <img src={`${props.images[currentIndex].asset.url}?w=640&h=480&fit=crop`} alt="Gallery Image" width={640} height={480} style={{ objectFit: "cover", width: "100%", height: "auto" }} />
        }
      </Box>
      <Grid gap={2} columns={props.images?.length > 1 ? props.images.length : 1}>
        {
          props.images?.length > 1 && props.images.map((image: any, index: number) => {
            return (
              <img
                onClick={() => setCurrentIndex(index)}
                src={`${image.asset.url}?w=640&h=480&fit=crop`}
                alt="Gallery Image" width={640} height={480}
                style={{ cursor: "pointer", objectFit: "cover", width: "100%", height: "auto", border: currentIndex === index ? "2px solid #000" : "2px solid transparent" }} />
            )
          })
        }
      </Grid>
    </Box >

  );
};

export default GalleryPreview;