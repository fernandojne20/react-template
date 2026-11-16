import { useCallback, useEffect, useState } from 'react';
import { getCharacters } from '../api/getCharacters';
import type { Character } from '../types/character';

export const useCharacters = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const abortController = new AbortController();
    getCharacters(page, abortController.signal)
      .then((cr) => {
        setCharacters((prev) => [...prev, ...cr.items]);
        if (cr.meta.currentPage === cr.meta.totalPages) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError('Not able to get the character Info');
        }
      })
      .finally(() => {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      });

    return () => abortController.abort();
  }, [page]);

  const loadMore = useCallback(() => setPage((p) => p + 1), []);

  const filteredCharacters = useCallback(
    (searchTerm: string) =>
      characters.filter((character) =>
        character.name.toLowerCase().includes(searchTerm),
      ),
    [characters],
  );

  const addCharacter = (item: Character) => {
    setCharacters((prev) => [{ ...item }, ...prev]);
  };

  return {
    loading,
    error,
    filteredCharacters,
    hasMore,
    loadMore,
    addCharacter,
  };
};
