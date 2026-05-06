
import { Component } from 'react';
import SearchSection from './components/SearchSection';
import ResultsSection from './components/ResultsSection';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='app'>
      <SearchSection />
      <ResultsSection />
      </div>
    );
  }
}

export default App;
