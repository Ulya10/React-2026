import './ResultsSection.css';
import type { ResultItem } from '../types/types';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface ResultsSectionProps {
  results: ResultItem[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
}

export default function ResultsSection(props: ResultsSectionProps) {
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
            {props.results.map((item, index) => (
              <li key={index} className="results-item">
                <Link to={`/${props.currentPage}/details/${index}`}>
                  <h3 className="results-name">{item.name}</h3>
                  <p className="results-descr">{item.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        )
      )}
    </section>
  );
}
