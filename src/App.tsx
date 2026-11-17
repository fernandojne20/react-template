import { useState } from 'react';
import './App.css';
import { SearchTermProvider } from './context/SearchTerm/SearchTermProvider';
import { CharactersPage } from './pages/CharactersPage';
import { DetailsPage } from './pages/DetailsPage';
import { SurveyBuilderPage } from './pages/SurveyBuilderPage';

type Page = 'characters' | 'survey';

function App() {
  const [page, setPage] = useState<Page>('characters');

  return (
    <>
      <nav className="app-nav">
        <button
          type="button"
          aria-pressed={page === 'characters'}
          onClick={() => setPage('characters')}
        >
          Characters
        </button>
        <button
          type="button"
          aria-pressed={page === 'survey'}
          onClick={() => setPage('survey')}
        >
          Survey Builder
        </button>
      </nav>

      {page === 'characters' ? (
        <SearchTermProvider>
          <DetailsPage />
          <CharactersPage />
        </SearchTermProvider>
      ) : (
        <SurveyBuilderPage />
      )}
    </>
  );
}

export default App;
