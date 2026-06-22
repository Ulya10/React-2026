import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function About({ locale }: { locale: string }) {
  const t = useTranslations();
  return (
    <div>
      <h2>{t('about')}</h2>
      <p>
        Made by <a href="https://github.com/Ulya10">Ulya10</a>
      </p>
      <p>
        As a task for{' '}
        <a
          href="https://rs.school/courses/reactjs/"
          target="_blank"
          rel="noreferrer"
        >
          RS School React course
        </a>
      </p>
      <Link href={`/${locale}`}>{t('backHome')}</Link>
    </div>
  );
}
