"use client";
import * as React from 'react';
import { cn } from '@/lib/utils';

interface ISearchProps {
  s?: string;
  className?: string;
}

const Search: React.FunctionComponent<ISearchProps> = ({ s, className }) => {
  return (
    <form action={"/search"} method="GET" className={cn("flex items-center gap-2", className)}>
      <input name="s" type="text" className="border border-gray-300 rounded-md p-2" value={s} placeholder="Keyword" />
      <button>Search</button>
    </form>
  );
};

export default Search;
