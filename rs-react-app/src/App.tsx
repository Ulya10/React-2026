import SearchSection from './components/SearchSection';
import ResultsSection from './components/ResultsSection';
import About from './components/About';
import NotFound from './components/NotFound';
import { Routes, Route, Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { getItems } from './api/api';
import './App.css';
import type { ResultItem } from './types/types';

export default function App() {
  const [results, setResults] = useState<ResultItem[]>([]);
  const [lastSearch, setlastSearch] = useLocalStorage('search-text', '');
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const itemsOnPage = 5;

  const totalPages = Math.ceil(results.length / itemsOnPage);

  const currentResults = results.slice(
    (currentPage - 1) * itemsOnPage,
    currentPage * itemsOnPage
  );

  const changePage = (page: number) => {
    setSearchParams({ page: String(page) });
  };

  useEffect(() => {
    setisLoading(true);
    setError(null);

    if (lastSearch) {
      getItems(lastSearch)
        .then((data) => {
          setisLoading(false);
          setResults(data);
        })
        .catch((err: Error) => {
          setisLoading(false);
          setError(err.message);
        });
    } else {
      getItems()
        .then((data) => {
          setisLoading(false);
          setResults(data);
        })
        .catch((err: Error) => {
          setisLoading(false);
          setError(err.message);
        });
    }
  }, []);

  const updateResults = (text: string): void => {
    if (text === lastSearch) {
      return;
    } else {
      setSearchParams({ page: '1' });
      setisLoading(true);
      setError(null);
      getItems(text)
        .then((data) => {
          setisLoading(false);
          setResults(data);
          setlastSearch(text);
        })
        .catch((err: Error) => {
          setisLoading(false);
          setError(err.message);
        });
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app">
            <nav>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
            </nav>
            <SearchSection onSubmitToSearch={updateResults} />
            <ResultsSection
              results={currentResults}
              isLoading={isLoading}
              error={error}
            />

            {!isLoading && results.length > 0 && totalPages > 1 && (
              <div className="controls">
                <button
                  className="control-btn"
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="control-btn"
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        }
      />

      <Route path="/about" element={<About />} />

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
