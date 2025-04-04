'use client'

import { useState } from 'react'
import Image from 'next/image'
import { type GalleryBlock } from '@/types/types.sanity'
import imageBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'
interface GalleryBlockProps {
  value: GalleryBlock
}

export default function GalleryBlock({ value }: GalleryBlockProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const images = value.images || []
  const builder = imageBuilder(client)

  if (!images.length) return null

  return (
    <div className="w-full space-y-4 not-prose">
      {/* Main large image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {images[selectedImage]?.asset && (
          <Image
            src={builder.image(images[selectedImage].asset)
              .width(800)
              .height(600)
              .url()}
            alt=""
            fill
            className="object-cover"
            priority={selectedImage === 0}
          />
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.map((image, index) => (
          <button
            key={image._key}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square w-full overflow-hidden ${selectedImage === index
              ? 'ring-2 ring-primary ring-offset-2'
              : 'hover:opacity-80'
              }`}
          >
            {image.asset && (
              <Image
                src={builder.image(image.asset)
                  .width(200)
                  .height(200)
                  .fit('crop')
                  .dpr(2)
                  .crop('center')
                  .url()}
                alt=""
                fill
                className="object-cover"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
