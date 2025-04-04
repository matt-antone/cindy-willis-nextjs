# System Patterns

## Architecture Overview
The application follows a modern Next.js architecture with the following key components:

1. Frontend Layer
   - Next.js App Router
   - React components
   - TypeScript implementation
   - Tailwind CSS styling

2. Content Management Layer
   - Sanity CMS integration
   - Content schemas
   - Webhook notifications
   - Cache management

3. API Layer
   - Next.js API routes
   - Sanity client
   - Cache clearing endpoints

## Content Schema Structure
1. Document Types
   - `home`: Main landing page content
   - `page`: Generic page content
   - `post`: Blog post content
   - `settings`: Global site settings
   - `media.tag`: Media tagging system

2. Content Types
   - `blockContent`: Rich text content with multiple block types
   - `bento2`: Two-column content layout
   - `features`: Feature list component
   - `slideshow`: Image carousel component
   - `youtube`: YouTube video embedding
   - `linkImage`: Image with link component

3. Asset Types
   - `sanity.imageAsset`: Image management
   - `sanity.fileAsset`: File management
   - `sanity.imageMetadata`: Image metadata
   - `sanity.imageDimensions`: Image dimensions
   - `sanity.imagePalette`: Image color palette
   - `sanity.imageCrop`: Image cropping data
   - `sanity.imageHotspot`: Image focus point

4. Navigation Structure
   - Desktop navigation
   - Mobile navigation
   - Footer navigation
   - Organization links

5. Organization Schema
   - Business information
   - Contact details
   - Location data
   - Gallery images
   - Business type classification

## Key Technical Decisions
1. Next.js App Router
   - Modern routing system
   - Server components by default
   - Improved performance

2. Sanity Integration
   - Headless CMS approach
   - Webhook-based updates
   - Efficient content delivery

3. TypeScript Implementation
   - Type safety
   - Better developer experience
   - Improved maintainability

## Design Patterns
1. Component Architecture
   - Radix UI components
   - Tailwind CSS styling
   - Modular design

2. State Management
   - React hooks
   - Server components
   - Client components

3. Data Flow
   - Sanity → API → Frontend
   - Webhook → Cache Clear → Revalidation
   - Type-safe data handling

## Component Relationships
1. Frontend Components
   - Layout components
   - Page components
   - UI components
   - Data fetching components

2. API Components
   - Route handlers
   - Cache management
   - Sanity client

3. Integration Points
   - Sanity webhooks
   - Cache clearing
   - Content delivery 