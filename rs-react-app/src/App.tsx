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
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);

    this.state = {
      results: [],
      lastSearch : '',
      isLoading: false
    };
  }

  componentDidMount(): void {
    console.log('App загрузился');
    this.setState({isLoading : true});
    const savedText = localStorage.getItem('search-text');
    if (savedText) {
      getItems(savedText).then((data) => {
        this.setState({ results: data, lastSearch: savedText, isLoading: false});
      });
    } else {
      getItems().then((data) => {
        this.setState({ results: data, isLoading: false });
      });
    }
  }

  updateResults = (text: string): void => {
    if (text === this.state.lastSearch) {
      return
    } else {
      this.setState({ isLoading: true });
      getItems(text).then((data) => {
        this.setState({ results: data,  lastSearch: text, isLoading: false});
      })
    }
   
  };

  render() {
    return (
      <div className="app">
        <SearchSection onSubmitToSearch={this.updateResults} />
        <ResultsSection results={this.state.results} isLoading = {this.state.isLoading}/>
      </div>
    );
  }
}

export default App;
