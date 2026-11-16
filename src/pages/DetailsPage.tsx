import { useSearchTerm } from '../context/SearchTerm/useSearchTerm';

export const DetailsPage = () => {
  const { term } = useSearchTerm();

  return <h2>Search Term: {term}</h2>;
};
