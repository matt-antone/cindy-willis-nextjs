import * as React from 'react';
import { cn } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import queries from '@/sanity/queries';
import Image from 'next/image';
import Link from 'next/link';
import urlBuilder from '@sanity/image-url';
import { getRevalidation, QueryTypes } from '@/sanity/queries';

const revalidate = getRevalidation(QueryTypes.Settings)

interface ILogoProps {
  className?: string;
}

const Logo: React.FunctionComponent<ILogoProps> = async ({ className }) => {
  const { logo, siteTitle } = await client.fetch(queries.settings.logo, {}, revalidate);
  return (
    <div className={cn("text-2xl font-bold", className)}>
      <Link href="/">
        {logo ? (
          <Image
            {...logo}
            src={urlBuilder(client).image(logo).width(200).dpr(2).auto('format').url()}
            alt={logo.alt || ""}
            className="w-44 h-auto"
          />
        ) : (
          <span>{siteTitle || 'Untitled'}</span>
        )}
      </Link>
    </div>
  );
};

export default Logo;
