'use client';
import { useSelectedStore } from '../store/useSelectedStore';
import { downloadCSV } from '@/app/actions';
import './Flyout.css';
import { useTranslations } from 'next-intl';

export default function Flyout() {
  const numberOfItems = useSelectedStore(
    (state) => state.selectedIndexes.length
  );
  const unselectAll = useSelectedStore((state) => state.unselectAll);
  const selectedIndexes = useSelectedStore((state) => state.selectedIndexes);
  const results = useSelectedStore((state) => state.results);
  const t = useTranslations();

  if (numberOfItems === 0) {
    return null;
  }

  const downloadSelected = async () => {
    const ids: number[] = [];
    const names: string[] = [];
    const descriptions: string[] = [];

    for (const id of selectedIndexes) {
      const item = results.find((joke) => joke.id === id);
      if (item) {
        ids.push(item.id);
        names.push(item.name);
        descriptions.push(item.description);
      }
    }

    const result = await downloadCSV(ids, names, descriptions);

    const blob = new Blob([new Uint8Array(result.data)], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flyout">
      <span>
        {t('selected')}: {numberOfItems}
      </span>
      <div className="flyout-buttons">
        <button onClick={unselectAll}>{t('unselectAll')}</button>
        <button onClick={downloadSelected}>{t('download')}</button>
      </div>
    </div>
  );
}
