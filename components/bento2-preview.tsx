import React from 'react'
import { Box, Flex, Text, } from '@sanity/ui'

export const Bento2Preview = (props: any) => {
  const { title, image, reverse, content } = props || {}
  return (
    <Flex padding={2} gap={4} direction="column">
      <Text weight="semibold">{title} {reverse && "Reversed"}</Text>
      <Flex direction={reverse ? 'row-reverse' : 'row'} gap={4}>
        {/* Content section - 2/3 width */}
        <Box flex={2}>
          {content && (
            <Box dangerouslySetInnerHTML={{ __html: content }} />
          )}
        </Box>

        {/* Image section - 1/3 width */}
        <Box flex={1}>
          {image ? (
            <img
              src={image}
              // alt={image.alt || 'Bento image'}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '4px',
              }}
            />
          ) : (
            <Box
              style={{
                backgroundColor: '#eee',
                width: '100%',
                height: '100px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text size={1} muted>No image</Text>
            </Box>
          )}
        </Box>
      </Flex>
    </Flex>

  )
} 