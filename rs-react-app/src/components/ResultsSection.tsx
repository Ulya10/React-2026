import './ResultsSection.css';
import type { ResultItem } from '../types/types';
import { Link } from 'react-router-dom';
import { useSelectedStore } from '../store/useSelectedStore';

interface ResultsSectionProps {
  results: ResultItem[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
}

export default function ResultsSection(props: ResultsSectionProps) {
  const selectedIndexes = useSelectedStore((state) => state.selectedIndexes);
  const toggleItem = useSelectedStore((state) => state.toggleItem);
  return (
    <section className="results-section">
      <h2>Results</h2>
      {props.error ? (
        <p className="error-message">{props.error}</p>
      ) : props.isLoading ? (
        <p>Loading...</p>
      ) : (
        props.results.length > 0 && (
          <ul className="results-list">
            {props.results.map((item, index) => {
              const globalIndex = (props.currentPage - 1) * 5 + index;

              return (
                <li
                  key={index}
                  className="results-item"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={selectedIndexes.includes(globalIndex)}
                    onChange={(evt) => {
                      evt.stopPropagation();
                      toggleItem(globalIndex);
                    }}
                  />
                  <Link to={`/${props.currentPage}/details/${globalIndex}`}>
                    <h3 className="results-name">{item.name}</h3>
                    <p className="results-descr">{item.description}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )
      )}
    </section>
  );
}
