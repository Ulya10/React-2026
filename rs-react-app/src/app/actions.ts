'use server';
import type { ResultItem } from '@/types/types';

const BASE_URL = 'https://official-joke-api.appspot.com/jokes/random/50';
const DETAILS_URL = 'https://official-joke-api.appspot.com/jokes';

export async function downloadCSV(
  ids: number[],
  names: string[],
  descriptions: string[]
) {
  let csv = 'Name,Description\n';

  for (let i = 0; i < ids.length; i++) {
    csv += `"${names[i]}","${descriptions[i]}"\n`;
  }

  const blob = new Blob([csv], { type: 'text/csv' });
  const bytes = await blob.arrayBuffer();

  return {
    data: Array.from(new Uint8Array(bytes)),
    filename: `${ids.length}_items.csv`,
  };
}

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
    (joke: { setup: string; punchline: string; id: number }) => ({
      name: joke.setup,
      description: joke.punchline,
      id: joke.id,
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

export async function getDetails(id: number): Promise<ResultItem> {
  const response = await fetch(`${DETAILS_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }
  const jokeForDetails = await response.json();
  return {
    id: jokeForDetails.id,
    name: jokeForDetails.setup,
    description: jokeForDetails.punchline,
    type: jokeForDetails.type,
  };
}
