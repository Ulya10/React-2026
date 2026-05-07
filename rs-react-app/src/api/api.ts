interface ResultItem {
  name: string;
  description: string;
}

const mockResults: ResultItem[] = [
  { name: 'one', description: 'oneone' },
  { name: 'two', description: 'twotwo' },
  { name: 'three', description: 'three' },
];

export function getItems(searchWord?: string): Promise<ResultItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!searchWord || searchWord.trim() === '') {
        resolve(mockResults);
      } else {
        const uncasedSearchWord = searchWord.toLowerCase().trim();
        resolve(
          mockResults.filter(
            (item) =>
              item.name.toLowerCase().includes(uncasedSearchWord) ||
              item.description.toLowerCase().includes(uncasedSearchWord)
          )
        );
      }
    }, 500);
  });
}
