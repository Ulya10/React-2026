import { Component } from 'react';
import './ResultsSection.css';

interface ResultItem {
  name: string;
  description: string;
}

interface ResultsSectionProps {
  results: ResultItem[];
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
        {results.length > 0 && (
          <ul>
            {results.map((item, index) => (
              <li key={index}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }
}

export default ResultsSection;
