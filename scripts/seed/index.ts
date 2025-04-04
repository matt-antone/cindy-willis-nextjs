#!/usr/bin/env node

import { Command } from 'commander'
import { faker } from '@faker-js/faker'
import { createClient, SanityDocumentStub } from '@sanity/client'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { tryCatch } from '../../lib/tryCatch'
import { BlockContent, Home, Page, Post, Tag, Settings } from '../../sanity.types'

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
    finalUrl = `https://picsum.photos/1920/1440.jpg`
  }
  console.log('Importing image:', finalUrl)

  try {
    const { data: response, error } = await tryCatch(fetch(finalUrl))
    if (error) {
      throw new Error(`Failed to fetch image: ${error.message}: ${finalUrl}`)
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}: ${finalUrl}`)
    }
    const buffer = await response.arrayBuffer()
    const asset = await client.assets.upload('image', Buffer.from(buffer))
    console.log('Successfully imported image:', asset._id)
    return asset._id
  } catch (error) {
    console.error('Error importing image:', error)
    // If we've retried less than 3 times, try again with a delay
    if (retryCount < 3) {
      console.log(`Retrying image import (attempt ${retryCount + 1})...`)
      await delay(1000) // Wait 1 second before retrying
      return importImage(imageUrl, retryCount + 1, isIcon)
    }
    throw error // If we've retried 3 times, throw the error
  }
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
const generateContentBlock = (): BlockContent[number] => ({
  _type: 'block',
  _key: faker.string.uuid(),
  style: 'normal',
  markDefs: [],
  children: [
    {
      _type: 'span',
      _key: faker.string.uuid(),
      text: faker.lorem.paragraph(8),
      marks: [],
    },
  ],
})

// Helper function to generate image reference
const generateImageRef = async (isIcon = false) => {
  const imageUrl = faker.image.url()
  const assetId = await importImage(imageUrl, 0, isIcon)
  return {
    _type: 'image' as const,
    _key: faker.string.uuid(),
    asset: {
      _ref: assetId,
      _type: 'reference' as const,
      _weak: false,
    },
  }
}

// Generate block content with rate limiting
const generateBlockContent = async (): Promise<BlockContent[number]> => {
  const blockTypes = ['testimonialBlock', 'galleryBlock', 'slideshowBlock', 'bento2Block', 'youtubeBlock', 'featuresBlock', 'carouselBlock'] as const
  const blockType = faker.helpers.arrayElement(blockTypes)

  const baseBlock = {
    _type: blockType,
    _key: faker.string.uuid(),
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

    case 'slideshowBlock': {
      const numSlides = faker.number.int({ min: 3, max: 5 })
      const images = await processSequentially(
        Array.from({ length: numSlides }),
        async () => generateImageRef(),
        1000
      )
      return {
        ...baseBlock,
        _type: 'slideshowBlock' as const,
        images,
      }
    }

    case 'bento2Block': {
      const blocks: Array<{
        children?: Array<{
          marks?: string[]
          text?: string
          _type: 'span'
          _key: string
        }>
        style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote'
        listItem?: 'bullet' | 'number'
        markDefs?: Array<{
          href?: string
          _type: 'link'
          _key: string
        }>
        level?: number
        _type: 'block'
        _key: string
      }> = []
      blocks.push({
        _type: 'block',
        _key: faker.string.uuid(),
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: faker.string.uuid(),
            text: faker.lorem.paragraph(8),
            marks: [],
          },
        ],
      })
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
          _key: faker.string.uuid(),
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

    case 'carouselBlock': {
      const numSlides = faker.number.int({ min: 3, max: 5 })
      const images = await processSequentially(
        Array.from({ length: numSlides }),
        async () => ({
          _key: faker.string.uuid(),
          image: await generateImageRef(),
          body: [
            {
              _type: 'block' as const,
              _key: faker.string.uuid(),
              style: 'normal' as const,
              markDefs: [],
              children: [
                {
                  _type: 'span' as const,
                  _key: faker.string.uuid(),
                  text: faker.lorem.paragraph(2),
                  marks: [],
                },
              ],
            },
          ],
        }),
        1000
      )
      return {
        ...baseBlock,
        _type: 'carouselBlock' as const,
        title: faker.lorem.words(3),
        images,
        autoplay: faker.datatype.boolean(),
        interval: faker.number.int({ min: 3000, max: 8000 }),
      }
    }

    default:
      return generateContentBlock()
  }
}

// Generate blocks with content separators
const generateBlocksWithContent = async (numBlocks: number): Promise<BlockContent> => {
  const blocks: BlockContent = []

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
const generateHome = async (): Promise<SanityDocumentStub<Home>> => {
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
    _id: faker.string.uuid(),
    _type: 'home',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    _rev: faker.string.uuid(),
    title: faker.company.name(),
    description: faker.company.catchPhrase(),
    date: faker.date.past().toISOString(),
    body,
    sections,
  }
}

// Generate a page document
const generatePage = async (index: number): Promise<SanityDocumentStub<Page>> => {
  let galleryImage
  try {
    galleryImage = await Promise.all(
      Array.from({ length: 1 }).map(async () => ({
        _type: 'image' as const,
        _key: faker.string.uuid(),
        asset: {
          _ref: await importImage(faker.image.url()),
          _type: 'reference' as const,
          _weak: false,
        },
      }))
    )
  } catch (error) {
    console.error('Failed to generate gallery image for page:', error)
    throw error
  }

  // If this is the first page, make it the About Us page
  if (index === 0) {
    return {
      _id: faker.string.uuid(),
      _type: 'page',
      _createdAt: new Date().toISOString(),
      _updatedAt: new Date().toISOString(),
      _rev: faker.string.uuid(),
      title: 'About Us',
      description: faker.lorem.sentence(),
      date: faker.date.past().toISOString(),
      slug: {
        _type: 'slug',
        current: 'about-us',
      },
      body: await generateBlocksWithContent(faker.number.int({ min: 2, max: 5 })),
      gallery: galleryImage,
    }
  }

  return {
    _id: faker.string.uuid(),
    _type: 'page',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    _rev: faker.string.uuid(),
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    date: faker.date.past().toISOString(),
    slug: {
      _type: 'slug',
      current: faker.helpers.slugify(faker.lorem.words(3).toLowerCase()),
    },
    body: await generateBlocksWithContent(faker.number.int({ min: 2, max: 5 })),
    gallery: galleryImage,
  }
}

// Generate a post document
const generatePost = async (): Promise<SanityDocumentStub<Post>> => {
  let galleryImage
  try {
    galleryImage = await Promise.all(
      Array.from({ length: 1 }).map(async () => ({
        _type: 'image' as const,
        _key: faker.string.uuid(),
        asset: {
          _ref: await importImage(faker.image.url()),
          _type: 'reference' as const,
          _weak: false,
        },
      }))
    )
  } catch (error) {
    console.error('Failed to generate gallery image for post:', error)
    throw error // Re-throw to prevent creating posts without images
  }

  return {
    _id: faker.string.uuid(),
    _type: 'post',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    _rev: faker.string.uuid(),
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
    gallery: galleryImage,
  }
}

// Generate a settings document
const generateSettings = async (): Promise<SanityDocumentStub<Settings>> => {
  let siteLogo
  try {
    siteLogo = {
      _type: 'image' as const,
      asset: {
        _ref: await importImage('https://picsum.photos/400/400.jpg'),
        _type: 'reference' as const,
        _weak: false,
      },
    }
  } catch (error) {
    console.error('Failed to generate site logo:', error)
    throw error
  }

  // Create navigation items
  const navigationItems = [
    { label: 'Home', url: '/' },
    { label: 'About Us', url: '/about-us' },
    { label: 'Blog', url: '/blog' },
  ]

  return {
    _id: 'settings',
    _type: 'settings',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    _rev: faker.string.uuid(),
    siteTitle: faker.company.name(),
    siteDescription: faker.company.catchPhrase(),
    siteLogo,
    navigation: {
      desktop: navigationItems.map(item => ({
        _type: 'item' as const,
        _key: faker.string.uuid(),
        label: item.label,
        url: item.url,
      })),
      mobile: navigationItems.map(item => ({
        _type: 'item' as const,
        _key: faker.string.uuid(),
        label: item.label,
        url: item.url,
      })),
      footer: navigationItems.map(item => ({
        _type: 'item' as const,
        _key: faker.string.uuid(),
        label: item.label,
        url: item.url,
      })),
    },
  }
}

// Generate all documents
const generateAllDocuments = async (options: { pages: string; posts: string }) => {
  const documents: (SanityDocumentStub<Home> | SanityDocumentStub<Page> | SanityDocumentStub<Post> | SanityDocumentStub<Settings>)[] = []

  // Generate settings
  documents.push(await generateSettings())

  // Generate home
  documents.push(await generateHome())

  // Generate pages
  const numPages = parseInt(options.pages)
  const pages = await Promise.all(Array.from({ length: numPages }).map((_, index) => generatePage(index)))
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
  .option('-b, --posts <number>', 'number of blog posts to generate', '25')
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