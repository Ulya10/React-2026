'use client';
import useLocalStorage from '../hooks/useLocalStorage';
import type { ChangeEvent, SyntheticEvent } from 'react';
import './SearchSection.css';
import { useTranslations } from 'next-intl';

interface SearchSectionProps {
  onSubmitToSearch: (text: string) => void;
}

export default function SearchSection(props: SearchSectionProps) {
  const [inputText, setinputText] = useLocalStorage('search-text', '');
  const t = useTranslations();
  console.log('Current locale:', t('search'));

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
      <h2>{t('search')}</h2>
      <form onSubmit={submitSearch}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder={t('searchPlaceholder')}
        />
        <button type="submit">{t('search')}</button>
      </form>
    </section>
  );
}
