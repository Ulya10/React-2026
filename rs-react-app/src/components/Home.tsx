'use client';
import SearchSection from './SearchSection';
import ResultsSection from './ResultsSection';
import DetailsSection from './DetailsSection';
import useLocalStorage from '../hooks/useLocalStorage';
import { getItems } from '../api/api';
import { useSelectedStore } from '../store/useSelectedStore';
import './Home.css';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function Home({ page, detailsId }: { page: string; detailsId?: string }) {
  const [lastSearch, setlastSearch] = useLocalStorage('search-text', '');

  const currentPage = Number(page) || 1;
  const isDetailsOpen = !!detailsId;
  const router = useRouter();
  
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

  const changePage = (newPage: number) => {
    router.push(`/${newPage}`);
  };

  const updateResults = (text: string): void => {
    if (text === lastSearch) {
      return;
    }
    router.push('/1');
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
              router.push(`/${currentPage}`);
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
          (isDetailsOpen && 
          <div className="details-section">
          <DetailsSection id={detailsId!} page={page} />
        </div>)
        
      </div>
    </>
  );
}
