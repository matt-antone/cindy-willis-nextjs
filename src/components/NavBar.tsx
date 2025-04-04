"use client";

import { cn } from '@/lib/utils';
import * as React from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from 'next/link';

interface INavBarProps {
  menu: {
    _key: string;
    label: string;
    url: string;
  }[];
  className?: string;
}

const NavBar: React.FunctionComponent<INavBarProps> = ({ menu, className }) => {
  return (
    <NavigationMenu className={cn("relative flex items-center", className)}>
      <NavigationMenuList className="relative">
        {menu.map((item: { _key: string, label: string, url: string }) => (
          <NavigationMenuItem key={item._key} className="flex justify-center items-center">
            <Link href={item.url} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {item.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavBar;
