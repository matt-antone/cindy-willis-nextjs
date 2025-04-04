import * as React from 'react';
import { cn } from '@/lib/utils';
import Container from './Container';
import Logo from './Logo';
import StickyHeader from './StickyHeader';
import MobileMenu from './MobileMenu';
import NavBar from './NavBar';
import Search from './Search';
import { client } from '@/sanity/lib/client';
import queries from '@/sanity/queries';
import { getRevalidation, QueryTypes } from '@/sanity/queries';

const revalidate = getRevalidation(QueryTypes.Settings)

interface IHeaderProps {
  isSticky?: boolean;
  className?: string;
  id?: string;
}

const Header: React.FunctionComponent<IHeaderProps> = async ({ isSticky = false, className, id = "header" }) => {
  const mainMenu = await client.fetch(queries.settings.mainMenu, {}, revalidate);
  const mobileMenu = await client.fetch(queries.settings.mobileMenu, {}, revalidate);
  const HeaderChildren = () => {
    return (<Container>
      <div id={id} className="flex justify-between items-center relative h-24">
        <Logo />
        <NavBar className="hidden md:block" menu={mainMenu} />
        <Search className="hidden md:block" />
        <MobileMenu menu={mobileMenu}>
          <Logo />
        </MobileMenu>
      </div>
    </Container>)
  }

  return isSticky ? (
    <StickyHeader className={cn("sticky top-0 z-50 w-full h-24 bg-white shadow-sm", className)}>
      <HeaderChildren />
    </StickyHeader>
  ) : (
    <header className="w-full h-24 py-4">
      <HeaderChildren />
    </header>
  );
};

export default Header;
