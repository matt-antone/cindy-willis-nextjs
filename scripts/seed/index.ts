#!/usr/bin/env node

import { Command } from 'commander'
import { faker } from '@faker-js/faker'
import { createClient, SanityDocumentStub } from '@sanity/client'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { tryCatch } from '../../lib/tryCatch'

// Define types for our documents
type BlockContent = {
  _type: 'block' | 'testimonialBlock' | 'galleryBlock' | 'carouselBlock' | 'slideshowBlock' | 'bento2Block' | 'youtubeBlock' | 'featuresBlock'
  _key: string
  style?: string
  markDefs?: any[]
  children?: {
    _type: 'span'
    _key: string
    text: string
    marks: string[]
  }[]
  // Testimonial fields
  quote?: string
  author?: {
    name: string
    title?: string
    image?: {
      _type: 'image'
      asset: {
        _ref: string
        _type: 'reference'
      }
    }
  }
  rating?: number
  // Gallery fields
  images?: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
  }[]
  // Carousel fields
  slides?: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
    title?: string
    description?: string
  }[]
  // Slideshow fields
  slideshow?: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
    title?: string
    description?: string
  }[]
  // Bento fields
  content?: BlockContent[]
  image?: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  // Video block fields
  url?: string
  title?: string
  // Features block fields
  features?: {
    title: string
    description: string
    icon?: {
      _type: 'image'
      asset: {
        _ref: string
        _type: 'reference'
      }
    }
  }[]
}

type Section = {
  _type: 'section'
  _key: string
  name: string
  template: 'hero' | 'content' | 'gallery' | 'contact' | 'carousel' | 'bento'
  content: BlockContent[]
}

type HomeDocument = {
  _type: 'home'
  title: string
  description: string
  date: string
  body: BlockContent[]
  sections: Section[]
}

type PageDocument = {
  _type: 'page'
  title: string
  description: string
  date: string
  slug: {
    _type: 'slug'
    current: string
  }
  body: BlockContent[]
}

type Tag = {
  _type: 'tag'
  _key: string
  value: string
  label: string
}

type PostDocument = {
  _type: 'post'
  title: string
  description: string
  date: string
  slug: {
    _type: 'slug'
    current: string
  }
  body: BlockContent[]
  categories: Tag[]
  tags: Tag[]
}

const program = new Command()

// Initialize Sanity client
const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  token: process.env.SANITY_STUDIO_TOKEN,
  apiVersion: '2024-03-24',
  useCdn: false,
})

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Import an image and return its asset ID with rate limiting
const importImage = async (imageUrl: string, retryCount = 0, isIcon = false): Promise<string> => {
  let finalUrl: string
  if (isIcon) {
    // Use Iconify API for icons
    const icons = ['mdi:star', 'mdi:heart', 'mdi:check-circle', 'mdi:bell', 'mdi:lightbulb', 'mdi:rocket', 'mdi:shield-check']
    const icon = faker.helpers.arrayElement(icons)
    finalUrl = `https://api.iconify.design/${icon}.svg`
  } else {
    // Use Lorem Picsum for regular images
    finalUrl = `https://picsum.photos/1024/768.jpg`
  }
  console.log('finalUrl', finalUrl)
  const { data: response, error } = await tryCatch(fetch(finalUrl))
  if (error) {
    throw new Error(`ERROR: Failed to fetch image: ${error.message}: ${finalUrl}`)
  }
  if (!response.ok) {
    throw new Error(`RESPONSE ERROR: Failed to fetch image: ${response.statusText}: ${finalUrl}`)
  }
  const buffer = await response.arrayBuffer()
  const asset = await client.assets.upload('image', Buffer.from(buffer))
  return asset._id


  // try {
  // } catch (error: any) {
  //   if (error.statusCode === 429 && retryCount < 3) {
  //     const waitTime = Math.pow(2, retryCount) * 1000
  //     console.log(`Rate limited, waiting ${waitTime}ms before retry...`)
  //     await delay(waitTime)
  //     return importImage(imageUrl, retryCount + 1, isIcon)
  //   }
  //   console.error('Error importing image:', error)
  //   throw error
  // }
}

// Process array of items sequentially with delay
const processSequentially = async <T, R>(
  items: T[],
  processFn: (item: T) => Promise<R>,
  delayMs: number = 1000
): Promise<R[]> => {
  const results: R[] = []
  for (const item of items) {
    const result = await processFn(item)
    results.push(result)
    await delay(delayMs) // Add delay between each operation
  }
  return results
}

// Generate a content block
const generateContentBlock = (): BlockContent => ({
  _type: 'block' as const,
  _key: faker.string.uuid(),
  style: 'normal',
  markDefs: [],
  children: [
    {
      _type: 'span' as const,
      _key: faker.string.uuid(),
      text: faker.lorem.paragraph(8),
      marks: [],
    },
  ],
})

// Generate block content with rate limiting
const generateBlockContent = async (): Promise<BlockContent> => {
  const blockTypes = ['testimonialBlock', 'galleryBlock', 'carouselBlock', 'slideshowBlock', 'bento2Block', 'youtubeBlock', 'featuresBlock'] as const
  const blockType = faker.helpers.arrayElement(blockTypes)

  const baseBlock = {
    _type: blockType,
    _key: faker.string.uuid(),
  }

  // Helper function to generate image reference
  const generateImageRef = async (isIcon = false) => {
    const imageUrl = faker.image.url()
    const assetId = await importImage(imageUrl, 0, isIcon)
    return {
      _type: 'image' as const,
      asset: {
        _ref: assetId,
        _type: 'reference' as const,
      },
    }
  }

  switch (blockType) {
    case 'testimonialBlock': {
      const authorImage = await generateImageRef()
      return {
        ...baseBlock,
        _type: 'testimonialBlock' as const,
        quote: faker.lorem.paragraph(),
        author: {
          name: faker.person.fullName(),
          title: faker.person.jobTitle(),
          image: authorImage,
        },
        rating: faker.number.int({ min: 1, max: 5 }),
      }
    }

    case 'galleryBlock': {
      const numImages = faker.number.int({ min: 2, max: 6 })
      const images = await Promise.all(
        Array.from({ length: numImages }, () => generateImageRef())
      )
      return {
        ...baseBlock,
        _type: 'galleryBlock' as const,
        images,
      }
    }

    case 'carouselBlock': {
      const numSlides = faker.number.int({ min: 2, max: 5 })
      const images = await processSequentially(
        Array.from({ length: numSlides }),
        async () => ({
          ...(await generateImageRef()),
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
        }),
        1000
      )
      return {
        ...baseBlock,
        _type: 'carouselBlock' as const,
        images,
      }
    }

    case 'slideshowBlock': {
      const numSlides = faker.number.int({ min: 3, max: 5 })
      const images = await processSequentially(
        Array.from({ length: numSlides }),
        async () => ({
          ...(await generateImageRef()),
        }),
        1000
      )
      return {
        ...baseBlock,
        _type: 'slideshowBlock' as const,
        images,
      }
    }

    case 'bento2Block': {
      const blocks: BlockContent[] = []
      blocks.push(generateContentBlock())
      return {
        ...baseBlock,
        _type: 'bento2Block' as const,
        content: blocks,
        image: await generateImageRef(),
      }
    }

    case 'youtubeBlock': {
      return {
        ...baseBlock,
        _type: 'youtubeBlock' as const,
        url: 'https://www.youtube.com/watch?v=nbg2AEdVi6s',
      }
    }

    case 'featuresBlock': {
      const numFeatures = faker.number.int({ min: 2, max: 4 })
      const features = await processSequentially(
        Array.from({ length: numFeatures }),
        async () => ({
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(1),
          icon: await generateImageRef(true),
        }),
        1000
      )
      return {
        ...baseBlock,
        _type: 'featuresBlock' as const,
        features,
      }
    }

    default:
      return generateContentBlock()
  }
}

// Generate blocks with content separators
const generateBlocksWithContent = async (numBlocks: number): Promise<BlockContent[]> => {
  const blocks: BlockContent[] = []

  // Start with a content block
  blocks.push(generateContentBlock())

  // Generate alternating blocks
  for (let i = 0; i < numBlocks; i++) {
    // Add a special block
    blocks.push(await generateBlockContent())
    // Add a content block after each special block
    blocks.push(generateContentBlock())
  }

  return blocks
}

// Generate a home document
const generateHome = async (): Promise<SanityDocumentStub<HomeDocument>> => {
  const body = await generateBlocksWithContent(faker.number.int({ min: 2, max: 5 }))
  const sections = await Promise.all(
    Array.from({ length: faker.number.int({ min: 2, max: 4 }) }).map(async () => ({
      _type: 'section' as const,
      _key: faker.string.uuid(),
      name: faker.lorem.words(2),
      template: faker.helpers.arrayElement(['hero', 'content', 'gallery', 'contact', 'carousel', 'bento']),
      content: await generateBlocksWithContent(faker.number.int({ min: 2, max: 5 })),
    }))
  )

  return {
    _type: 'home',
    title: faker.company.name(),
    description: faker.company.catchPhrase(),
    date: faker.date.past().toISOString(),
    body,
    sections,
  }
}

// Generate a page document
const generatePage = async (): Promise<SanityDocumentStub<PageDocument>> => ({
  _type: 'page',
  title: faker.lorem.words(3),
  description: faker.lorem.sentence(),
  date: faker.date.past().toISOString(),
  slug: {
    _type: 'slug',
    current: faker.helpers.slugify(faker.lorem.words(3).toLowerCase()),
  },
  body: await generateBlocksWithContent(faker.number.int({ min: 2, max: 5 })),
})

// Generate a post document
const generatePost = async (): Promise<SanityDocumentStub<PostDocument>> => ({
  _type: 'post',
  title: faker.lorem.words(5),
  description: faker.lorem.sentence(),
  date: faker.date.past().toISOString(),
  slug: {
    _type: 'slug',
    current: faker.helpers.slugify(faker.lorem.words(3).toLowerCase()),
  },
  body: await generateBlocksWithContent(faker.number.int({ min: 2, max: 5 })),
  categories: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => ({
    _type: 'tag',
    _key: faker.string.uuid(),
    value: faker.lorem.word(),
    label: faker.lorem.word(),
  })),
  tags: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => ({
    _type: 'tag',
    _key: faker.string.uuid(),
    value: faker.lorem.word(),
    label: faker.lorem.word(),
  })),
})

// Generate all documents
const generateAllDocuments = async (options: { pages: string; posts: string }) => {
  const documents: (SanityDocumentStub<HomeDocument> | SanityDocumentStub<PageDocument> | SanityDocumentStub<PostDocument>)[] = []

  // Generate home
  documents.push(await generateHome())

  // Generate pages
  const numPages = parseInt(options.pages)
  const pages = await Promise.all(Array.from({ length: numPages }).map(generatePage))
  documents.push(...pages)

  // Generate posts
  const numPosts = parseInt(options.posts)
  const posts = await Promise.all(Array.from({ length: numPosts }).map(generatePost))
  documents.push(...posts)

  return documents
}

// Export documents to NDJSON file
const exportToNDJSON = async (documents: any[], outputPath: string) => {
  const ndjson = documents.map(doc => JSON.stringify(doc)).join('\n')
  await writeFile(outputPath, ndjson)
  console.log(`📄 Exported ${documents.length} documents to ${outputPath}`)
}

program
  .name('sanity-seed')
  .description('CLI to seed Sanity studio with dummy data')
  .version('1.0.0')

program
  .command('seed')
  .description('Seed the database with dummy data')
  .option('-p, --pages <number>', 'number of pages to generate', '5')
  .option('-b, --posts <number>', 'number of blog posts to generate', '10')
  .option('--clean', 'clean existing data before seeding', false)
  .option('-e, --export <path>', 'export generated data to NDJSON file')
  .action(async (options) => {
    try {
      // Check for required environment variables
      if (!process.env.SANITY_STUDIO_TOKEN) {
        console.error('❌ Error: SANITY_STUDIO_TOKEN environment variable is required')
        console.log('💡 Tip: Create a token with write permissions in your Sanity project settings')
        process.exit(1)
      }

      // Generate all documents first
      const documents = await generateAllDocuments(options)

      // Export to NDJSON if requested
      if (options.export) {
        const outputPath = options.export.endsWith('.ndjson')
          ? options.export
          : `${options.export}.ndjson`
        await exportToNDJSON(documents, outputPath)
        if (!options.clean) {
          // If we're only exporting and not cleaning/seeding, exit here
          return
        }
      }

      // Proceed with database operations if needed
      if (options.clean) {
        console.log('🧹 Cleaning existing data...')
        await client.delete({ query: '*[_type in ["home", "page", "post"]]' })
      }

      console.log('🌱 Starting seeding process...')

      // Create all documents
      console.log(`📝 Creating ${documents.length} documents...`)
      await Promise.all(documents.map(doc => client.create(doc as any)))

      console.log('✅ Seeding completed successfully!')
    } catch (error) {
      console.error('❌ Error during seeding:', error)
      process.exit(1)
    }
  })

program.parse() 