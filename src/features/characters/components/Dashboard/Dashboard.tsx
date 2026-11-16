import './dashboard.css';
import { useMemo, useState } from 'react';
import { CharacterCard } from '../CharacterCard/CharacterCard';
import { CharacterSearch } from '../CharacterSearch/CharacterSearch';
import { CreateCharacterForm } from '../CreateCharacterForm/CreateCharacterForm';
import { useCharacters } from '../../../hooks/useCharacters';
import { useDebounce } from '../../../../hooks/useDebounce';
import { InfiniteScrollTrigger } from '../../../../components/ui/InfiniteScrollTrigger/InfiniteScrollTrigger';

export const Dashboard = () => {
  const { loading, error, characters, loadMore, hasMore, addCharacter } =
    useCharacters();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search.trim().toLowerCase(), 300);

  const filteredCharacters = useMemo(
    () =>
      debouncedSearch
        ? characters.filter((c) =>
            c.name.toLowerCase().includes(debouncedSearch),
          )
        : characters,
    [characters, debouncedSearch],
  );

  const isFiltering = debouncedSearch.length > 0;

  return (
    <>
      <CreateCharacterForm onCreate={addCharacter} />
      <CharacterSearch value={search} onChange={setSearch} />

      {error && <div className="dashboard-status">{error}</div>}

      <section className="dashboard-container">
        {filteredCharacters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </section>

      {isFiltering && filteredCharacters.length === 0 && (
        <div className="dashboard-status">No characters match "{search}"</div>
      )}
      {loading && <div className="dashboard-status">Loading Characters...</div>}

      {/* Mientras se filtra no se cargan más páginas: el filtro es sobre lo ya cargado */}
      <InfiniteScrollTrigger
        onIntersect={loadMore}
        disabled={loading || !!error || !hasMore || isFiltering}
      />
    </>
  );
};
