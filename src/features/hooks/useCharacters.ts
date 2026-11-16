import { useCallback, useEffect, useState } from 'react';
import { getCharacters } from '../characters/api/getCharacters';
import type { Character } from '../characters/types/character';

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
        if (cr.meta.currentPage >= cr.meta.totalPages) {
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

  const loadMore = useCallback(() => {
    // loading se activa aquí (no dentro del effect) para que el observer
    // quede deshabilitado de inmediato y no dispare dos páginas seguidas
    setLoading(true);
    setPage((p) => p + 1);
  }, []);

  const addCharacter = useCallback((character: Character) => {
    setCharacters((prev) => [character, ...prev]);
  }, []);

  return {
    loading,
    error,
    characters,
    hasMore,
    loadMore,
    addCharacter,
  };
};
