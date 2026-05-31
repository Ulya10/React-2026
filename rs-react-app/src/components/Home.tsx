import SearchSection from './SearchSection';
import ResultsSection from './ResultsSection';
import { useParams, useNavigate, useLocation, Outlet } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { getItems } from '../api/api';
import { useSelectedStore } from '../store/useSelectedStore';
import './Home.css';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const [lastSearch, setlastSearch] = useLocalStorage('search-text', '');

  const location = useLocation();
  const isDetailsOpen = location.pathname.includes('/details/');

  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();
  const currentPage = Number(page) || 1;
  const itemsOnPage = 5;

  const {
    data: results = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['items', lastSearch],
    queryFn: () => {
      return getItems(lastSearch);
    },
  });

  const totalPages = Math.ceil(results.length / itemsOnPage);
  const setStoreResults = useSelectedStore((state) => state.setResults);
  if (results.length > 0) {
    setStoreResults(results);
  }

  const currentResults = results.slice(
    (currentPage - 1) * itemsOnPage,
    currentPage * itemsOnPage
  );

  const changePage = (page: number) => {
    navigate(`/${page}`);
  };

  const updateResults = (text: string): void => {
    if (text === lastSearch) {
      return;
    }
    navigate('/1');
    setlastSearch(text);
  };

  return (
    <>
      <SearchSection onSubmitToSearch={updateResults} />

      <div className="master-details">
        <div
          className="master-section"
          onClick={() => {
            if (isDetailsOpen) {
              navigate(`/${currentPage}`);
            }
          }}
        >
          <ResultsSection
            results={currentResults}
            isLoading={isLoading}
            error={error ? error.message : null}
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
        </div>

        <div className="details-section">
          <Outlet />
        </div>
      </div>
    </>
  );
}
