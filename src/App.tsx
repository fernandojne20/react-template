import './App.css';
import { SearchTermProvider } from './context/SearchTerm/SearchTermProvider';
import { CharactersPage } from './pages/CharactersPage';
import { DetailsPage } from './pages/DetailsPage';

function App() {
  return (
    <>
      <SearchTermProvider>
        <DetailsPage />
        <CharactersPage />
      </SearchTermProvider>
    </>
  );
}

export default App;
