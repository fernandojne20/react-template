import { useState, type ReactNode } from 'react';
import { SearchTermContext } from './SearchTermContext';

export const SearchTermProvider = ({ children }: { children: ReactNode }) => {
  const [term, setTerm] = useState<string>('');

  return (
    <SearchTermContext value={{ term, setTerm }}>{children}</SearchTermContext>
  );
};
