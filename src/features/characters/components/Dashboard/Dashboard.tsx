import './dashboard.css';
import { CharacterCard } from '../CharacterCard/CharacterCard';
import { useCharacters } from '../../../hooks/useCharacters';
import { InfiniteScrollTrigger } from '../../../../components/ui/InfiniteScrollTrigger/InfiniteScrollTrigger';

export const Dashboard = () => {
  const { loading, error, characters, loadMore, hasMore } = useCharacters();

  return (
    <>
      {loading && <div>Loading Characters...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && (
        <section className="dashboard-container">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}

          <InfiniteScrollTrigger
            onIntersect={loadMore}
            disabled={loading || !!error || !hasMore}
          />
        </section>
      )}
    </>
  );
};
