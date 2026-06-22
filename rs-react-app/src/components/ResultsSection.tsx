'use client';
import './ResultsSection.css';
import type { ResultItem } from '../types/types';
import Link from 'next/link';
import { useSelectedStore } from '../store/useSelectedStore';
import { useLocale } from 'next-intl';

interface ResultsSectionProps {
  results: ResultItem[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
}

export default function ResultsSection(props: ResultsSectionProps) {
  const locale = useLocale();
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
                    checked={selectedIndexes.includes(item.id)}
                    onChange={(evt) => {
                      evt.stopPropagation();
                      toggleItem(item.id);
                    }}
                  />
                  <Link
                    href={`/${locale}/${props.currentPage}/details/${item.id}`}
                  >
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
