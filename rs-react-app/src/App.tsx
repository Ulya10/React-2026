import { Component } from 'react';
import SearchSection from './components/SearchSection';
import ResultsSection from './components/ResultsSection';
import { getItems } from './api/api';
import './App.css';
import type { ResultItem } from './types/types';

interface AppState {
  results: ResultItem[];
  lastSearch : string;
  isLoading : boolean;
  error: string | null;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);

    this.state = {
      results: [],
      lastSearch : '',
      isLoading: false,
      error: null
    };
  }

  componentDidMount(): void {
    this.setState({isLoading : true, error: null });
    const savedText = localStorage.getItem('search-text');
    if (savedText) {
      getItems(savedText).then((data) => {
        this.setState({ results: data, lastSearch: savedText, isLoading: false});
      })
      .catch((err: Error) => {
        this.setState({ error: err.message, isLoading: false });
      });;
    } else {
      getItems().then((data) => {
        this.setState({ results: data, isLoading: false });
      })
      .catch((err: Error) => {
        this.setState({ error: err.message, isLoading: false });
      });;
    }
  }

  updateResults = (text: string): void => {
    if (text === this.state.lastSearch) {
      return
    } else {
      this.setState({ isLoading: true, error: null  });
      getItems(text).then((data) => {
        this.setState({ results: data,  lastSearch: text, isLoading: false});
      })
      .catch((err: Error) => {
        this.setState({ error: err.message, isLoading: false });
      });
    }
   
  };

  render() {
    return (
      <div className="app">
        <SearchSection onSubmitToSearch={this.updateResults} />
        <ResultsSection results={this.state.results} isLoading = {this.state.isLoading} error={this.state.error}/>
      </div>
    );
  }
}

export default App;
