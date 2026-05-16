import useLocalStorage from '../hooks/useLocalStorage';
import type { ChangeEvent, SyntheticEvent } from 'react';
import './SearchSection.css';

interface SearchSectionProps {
  onSubmitToSearch: (text: string) => void;
}

export default function SearchSection(props: SearchSectionProps) {
  const [inputText, setinputText] = useLocalStorage('search-text', '');

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setinputText(evt.target.value);
  };

  const submitSearch = (evt: SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const text: string = inputText.trim();
    setinputText(text);
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
