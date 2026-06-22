'use client';
import Link from 'next/link';
import Flyout from './Flyout';
import { useTheme } from '../context/ThemeContext';
import { useQueryClient } from '@tanstack/react-query';
import { useSelectedStore } from '../store/useSelectedStore';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  return (
    <button onClick={() => router.push(locale === 'en' ? '/ru' : '/en')}>
      {locale === 'en' ? 'RU' : 'EN'}
    </button>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const queryClient = useQueryClient();
  const unselectAll = useSelectedStore((state) => state.unselectAll);

  const refreshItems = () => {
    queryClient.invalidateQueries({ queryKey: ['items'] });
    unselectAll();
  };

  return (
    <div className="app">
      <nav>
        <Link href="/about">About</Link>
        <LocaleSwitcher />
        <button onClick={toggleTheme}>
          {theme === 'light' ? 'To Dark Humor' : 'To Light Humor'}
        </button>
        <button onClick={refreshItems}>Refresh</button>
      </nav>
      {children}
      <Flyout />
    </div>
  );
}
