import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function NotFound() {
  const locale = useLocale();
  return (
    <div>
      <h2>You must be joking!</h2>
      <p>Page not found</p>
      <Link href={`/${locale}`}>Back Home</Link>
    </div>
  );
}
