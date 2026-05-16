import type { ResultItem } from '../types/types';

const BASE_URL = 'https://official-joke-api.appspot.com/jokes/random/50';

export function getItems(searchWord?: string): Promise<ResultItem[]> {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const pokemons: ResultItem[] = data.map(
          (pokemon: { setup: string; punchline: string }) => ({
            name: pokemon.setup,
            description: pokemon.punchline,
          })
        );

        if (!searchWord || searchWord.trim() === '') {
          resolve(pokemons);
        } else {
          const uncasedSearchWord = searchWord.toLowerCase().trim();
          resolve(
            pokemons.filter(
              (item) =>
                item.name.toLowerCase().includes(uncasedSearchWord) ||
                item.description.toLowerCase().includes(uncasedSearchWord)
            )
          );
        }
      })
      .catch((error: Error) => {
        reject(error);
      });
  });
}
