import type { ResultItem } from '../types/types';

const BASE_URL = 'https://official-joke-api.appspot.com/jokes/random/50';

export async function getItems(searchWord?: string): Promise<ResultItem[]> {
  const url = searchWord
    ? `${BASE_URL}?search=${encodeURIComponent(searchWord.trim().toLowerCase())}`
    : BASE_URL;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }
  const data = await response.json();
  const jokes: ResultItem[] = data.map(
    (joke: { setup: string; punchline: string }) => ({
      name: joke.setup,
      description: joke.punchline,
    })
  );

  if (!searchWord || searchWord.trim() === '') {
    return jokes;
  } else {
    const uncasedSearchWord = searchWord.toLowerCase().trim();
    return jokes.filter(
      (item) =>
        item.name.toLowerCase().includes(uncasedSearchWord) ||
        item.description.toLowerCase().includes(uncasedSearchWord)
    );
  }
}
