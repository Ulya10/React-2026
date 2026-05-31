import { useSelectedStore } from '../store/useSelectedStore';
import './Flyout.css';

export default function Flyout() {
  const numberOfItems = useSelectedStore(
    (state) => state.selectedIndexes.length
  );
  const unselectAll = useSelectedStore((state) => state.unselectAll);
  const selectedIndexes = useSelectedStore((state) => state.selectedIndexes);
  const results = useSelectedStore((state) => state.results);

  if (numberOfItems === 0) {
    return null;
  }

  const downloadSelected = () => {
    let csv = 'Name, Description\n';

    for (const id of selectedIndexes) {
      const item = results.find((joke) => joke.id === id);
      if (item) {
        csv += `"${item.name}","${item.description}"\n`;
      }
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${numberOfItems}_items.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flyout">
      <span>Items selected: {numberOfItems}</span>
      <div className="flyout-buttons">
        <button onClick={unselectAll}>Unselect all</button>
        <button onClick={downloadSelected}>Download selected</button>
      </div>
    </div>
  );
}
