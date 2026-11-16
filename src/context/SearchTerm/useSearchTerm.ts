import { useContext } from 'react';
import { SearchTermContext } from './SearchTermContext';

export const useSearchTerm = () => {
  const searchTermContext = useContext(SearchTermContext);

  if (!searchTermContext) {
    throw new Error('Context Provider: useSearchTerm not initialized');
  }

  return searchTermContext;
};
