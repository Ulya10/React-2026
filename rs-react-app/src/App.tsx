import { Component } from 'react';
import SearchSection from './components/SearchSection';
import ResultsSection from './components/ResultsSection';
import { getItems } from './api/api';
import './App.css';
import type { ResultItem } from './types/types';

interface AppState {
  results: ResultItem[];
  lastSearch : string;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);

    this.state = {
      results: [],
      lastSearch : ''
    };
  }

  componentDidMount(): void {
    const savedText = localStorage.getItem('search-text');
    if (savedText) {
      getItems(savedText).then((data) => {
        this.setState({ results: data, lastSearch: savedText});
      });
    } else {
      getItems().then((data) => {
        this.setState({ results: data });
      });
    }
  }

  updateResults = (text: string): void => {
    if (text === this.state.lastSearch) {
      return
    } else {
      getItems(text).then((data) => {
        this.setState({ results: data,  lastSearch: text});
      })
    }
   
  };

  render() {
    return (
      <div className="app">
        <SearchSection onSubmitToSearch={this.updateResults} />
        <ResultsSection results={this.state.results} />
      </div>
    );
  }
}

export default App;
