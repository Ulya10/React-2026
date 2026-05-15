import SearchSection from './components/SearchSection';
import ResultsSection from './components/ResultsSection';
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
    <div className="app">
      <SearchSection onSubmitToSearch={updateResults} />
      <ResultsSection results={results} isLoading={isLoading} error={error} />
    </div>
  );
}
