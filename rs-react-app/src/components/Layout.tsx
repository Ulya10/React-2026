'use client';
import Link from 'next/link';
import Flyout from './Flyout';
import { useTheme } from '../context/ThemeContext';
import { useQueryClient } from '@tanstack/react-query';
import { useSelectedStore } from '../store/useSelectedStore';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  return (
    <button onClick={() => router.push(locale === 'en' ? '/ru/1' : '/en/1')}>
      {locale === 'en' ? 'RU' : 'EN'}
    </button>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const t = useTranslations();
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
        <Link href={`/${locale}/about`}>{t('about')}</Link>
        <LocaleSwitcher />
        <button onClick={toggleTheme}>
          {theme === 'light' ? t('themeDark') : t('themeLight')}
        </button>
        <button onClick={refreshItems}>{t('refresh')}</button>
      </nav>
      {children}
      <Flyout />
    </div>
  );
}
