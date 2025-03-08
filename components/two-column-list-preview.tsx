import { Box, Card, Flex, Stack, Text, Grid } from "@sanity/ui";
import React from "react";

export const TwoColumnListPreview = (value: any) => {
  const { title, subtitle, items } = value;
  console.log(value);
  // split items into two columns
  const items1 = items.slice(0, Math.ceil(items.length / 2));
  const items2 = items.slice(Math.ceil(items.length / 2));
  return (
    <Flex padding={2} gap={4} direction="column">
      <Text weight="semibold">Two Column List</Text>
      <Text size={4} cellPadding={2}>{title}</Text>
      <Grid columns={[1, 1, 2]} gap={2}>
        <Grid gap={2}>
          {items1.map((item: any) => (
            <Text>{item}</Text>
          ))}
        </Grid>
        <Grid gap={2}>
          {items2.map((item: any) => (
            <Text>{item}</Text>
          ))}
        </Grid>
      </Grid>
    </Flex>
  );
}