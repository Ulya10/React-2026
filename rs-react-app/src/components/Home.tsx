import SearchSection from './SearchSection';
import ResultsSection from './ResultsSection';
import {
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  Outlet,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { getItems } from '../api/api';
import type { ResultItem } from '../types/types';

export default function Home() {
  const [results, setResults] = useState<ResultItem[]>([]);
  const [lastSearch, setlastSearch] = useLocalStorage('search-text', '');
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();
  const currentPage = Number(page) || 1;

  const itemsOnPage = 5;

  const totalPages = Math.ceil(results.length / itemsOnPage);

  const currentResults = results.slice(
    (currentPage - 1) * itemsOnPage,
    currentPage * itemsOnPage
  );

  const changePage = (page: number) => {
    navigate(`/${page}`);
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
      navigate('/1');
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
    <>
      <SearchSection onSubmitToSearch={updateResults} />
      <ResultsSection
        results={currentResults}
        isLoading={isLoading}
        error={error}
        currentPage={currentPage}
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
      <div className="detail-section">
        <Outlet />
      </div>
    </>
  );
}
