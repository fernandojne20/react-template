import './dashboard.css';
import { CharacterCard } from '../CharacterCard/CharacterCard';
import { useCharacters } from '../../hooks/useCharacters';
import { InfiniteScrollTrigger } from '../../../../components/ui/InfiniteScrollTrigger/InfiniteScrollTrigger';
import { SearchBox } from '../../../../components/ui/SearchBox/SearchBox';
import { useState } from 'react';
import { useDebouce } from '../../../../hooks/useDebounce';
import { AddCharacterForm } from '../AddCharacterForm/AddCharacterForm';

export const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const {
    loading,
    error,
    filteredCharacters,
    loadMore,
    hasMore,
    addCharacter,
  } = useCharacters();
  const debouncedValue = useDebouce(searchTerm.toLowerCase(), 300);

  const characters = filteredCharacters(debouncedValue.toLowerCase());

  return (
    <>
      {loading && <div>Loading Characters...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && (
        <>
          <SearchBox
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <AddCharacterForm onCreate={(item) => addCharacter(item)} />
          <section className="dashboard-container">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}

            <InfiniteScrollTrigger
              onIntersect={loadMore}
              disabled={loading || !!error || !hasMore}
            />
          </section>
        </>
      )}
    </>
  );
};
