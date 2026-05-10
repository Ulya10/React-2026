import { Component } from 'react';
import './ResultsSection.css';
import type { ResultItem } from '../types/types';

interface ResultsSectionProps {
  results: ResultItem[];
  isLoading: boolean;
}

class ResultsSection extends Component<ResultsSectionProps> {
  constructor(props: ResultsSectionProps) {
    super(props);
  }

  render() {
    const results = this.props.results;
    return (
      <section className="results-section">
        <h2>Results</h2>
        {this.props.isLoading ? (
          <p>Loading...</p>
        ) : (
          results.length > 0 && (
            <ul className="results-list">
              {results.map((item, index) => (
                <li key={index} className="results-item">
                  <h3 className="results-name">{item.name}</h3>
                  <p className="results-descr">{item.description}</p>
                </li>
              ))}
            </ul>
          )
        )}
      </section>
    );
  }
}

export default ResultsSection;
