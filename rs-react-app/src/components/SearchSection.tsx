import { useState, useEffect } from 'react';
import type { ChangeEvent, SyntheticEvent } from 'react';
import './SearchSection.css';

interface SearchSectionProps {
  onSubmitToSearch: (text: string) => void;
}

export default function SearchSection(props: SearchSectionProps) {
  const [inputText, setinputText] = useState('');

  useEffect(() => {
    const savedText = localStorage.getItem('search-text');
    if (savedText) {
      setinputText(savedText);
    }
  }, []);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setinputText(evt.target.value);
  };
  const submitSearch = (evt: SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const text: string = inputText.trim();
    localStorage.setItem('search-text', text);
    props.onSubmitToSearch(text);
  };

  return (
    <section className="search-section">
      <h2>Search</h2>
      <form onSubmit={submitSearch}>
        <input type="text" value={inputText} onChange={handleInputChange} />
        <button type="submit">Search!</button>
      </form>
    </section>
  );
}
