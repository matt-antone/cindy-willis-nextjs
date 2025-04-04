import { cn } from '@/lib/utils';
import * as React from 'react';
import Container from './Container';
import { client } from '@/sanity/lib/client';
import queries, { getRevalidation, QueryTypes } from '@/sanity/queries';
import Logo from './Logo';
import Link from 'next/link';

interface IFooterProps {
  showLogo?: boolean;
  className?: string;
}

const revalidate = getRevalidation(QueryTypes.Settings)

const Footer: React.FunctionComponent<IFooterProps> = async ({ className, showLogo = false }) => {
  const title = await client.fetch(queries.settings.siteTitle, {}, revalidate);
  const menu = await client.fetch(queries.settings.footerMenu, {}, revalidate);

  return (
    <footer className={cn("w-full absolute bottom-0 bg-border", className)}>
      <Container>
        <div className="w-full h-32 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            {showLogo && <Logo />}
            <p>©{new Date().getFullYear()} {title || "Untitled"}. All rights reserved.</p>
          </div>
          <nav className="flex items-center gap-4">
            {menu.map((item: { _key: string, label: string, url: string }) => (
              <Link key={item._key} href={item.url} className="text-sm text-primary underline">{item.label}</Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer >
  );
};
export default Footer;
