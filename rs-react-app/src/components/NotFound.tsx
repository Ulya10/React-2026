import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const locale = useLocale();
  const t = useTranslations();
  return (
    <div>
      <h2>You must be joking!</h2>
      <p>{t('notFound')}</p>
      <Link href={`/${locale}`}>{t('backHome')}</Link>
    </div>
  );
}
