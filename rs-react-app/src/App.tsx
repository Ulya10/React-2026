import { Component } from 'react';
import SearchSection from './components/SearchSection';
import ResultsSection from './components/ResultsSection';
import { getItems } from './api/api';
import './App.css';
import type { ResultItem } from './types/types';

interface AppState {
  results: ResultItem[];
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);

    this.state = {
      results: [],
    };
  }

  componentDidMount(): void {
    const savedText = localStorage.getItem('search-text');
    if (savedText) {
      getItems(savedText).then((data) => {
        this.setState({ results: data });
      });
    } else {
      getItems().then((data) => {
        this.setState({ results: data });
      });
    }
  }

  render() {
    return (
      <div className="app">
        <SearchSection />
        <ResultsSection results={this.state.results} />
      </div>
    );
  }
}

export default App;
