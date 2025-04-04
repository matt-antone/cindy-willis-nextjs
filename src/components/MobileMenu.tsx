"use client";

import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import { MenuIcon } from 'lucide-react'

interface IMobileMenuProps {
  menu: {
    _key: string;
    label: string;
    url: string;
  }[];
  children?: React.ReactNode;
}

const MobileMenu: React.FunctionComponent<IMobileMenuProps> = ({ children, menu }) => {
  return (
    <div className="md:hidden flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span className="sr-only">Open Menu</span>
          <MenuIcon className="size-6 fill-current" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-8 md:hidden">
          <DropdownMenuLabel>
            {children}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {menu.map((item: { _key: string, label: string, url: string }) => (
            <DropdownMenuItem key={item._key}>
              <Link href={item.url} className="text-lg my-1">
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileMenu;
