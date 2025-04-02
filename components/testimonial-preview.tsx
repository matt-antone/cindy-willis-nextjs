import * as React from 'react';
import { Box, Text, Flex } from '@sanity/ui';

interface ITestimonialPreviewProps {
  quote: string;
  author: string;
  rating: number;
  media: string;
  position: string;
}

const TestimonialPreview: React.FunctionComponent<ITestimonialPreviewProps> = (props) => {
  const { quote, author, rating, media, position } = props;

  return (
    <Flex padding={2} gap={6} align="center">

      {media && <Box width={100}><img src={media} alt={author} width={100} height={100} style={{ display: 'block', width: 100, height: 100, borderRadius: 50, objectFit: 'cover' }} /></Box>}

      <blockquote>
        <Text>{quote}</Text>
        <cite style={{ display: 'block', marginTop: 10 }}><strong>{author}</strong>{position ? `, ${position}` : ''}</cite>
      </blockquote>
    </Flex>
  );
};

export default TestimonialPreview;
