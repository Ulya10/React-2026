
import { Component } from 'react';
import SearchSection from './components/SearchSection';
import ResultsSection from './components/ResultsSection';
import './App.css';

interface ResultItem {
  name: string;
  description: string;
}

const mockResults: ResultItem[] = [
  {name: 'one',
    description: 'oneone'
  },
  {name: 'two',
    description: 'twotwo'
  },
  {name: 'three',
    description: 'three'
  },
];

class App extends Component {
  render() {
    return (
      <div className='app'>
      <SearchSection />
      <ResultsSection results = {mockResults}/>
      </div>
    );
  }
}

export default App;
