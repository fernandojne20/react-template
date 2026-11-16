import { createContext } from 'react';

type SearchTermContextValue = {
  term: string;
  setTerm: (term: string) => void;
};
export const SearchTermContext = createContext<SearchTermContextValue | null>(
  null,
);
