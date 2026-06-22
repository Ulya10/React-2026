'use client';

import { getDetails } from '../api/api';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

export default function DetailsSection({
  id,
  page,
}: {
  id: string;
  page: string;
}) {
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();
  const numId = Number(id);

  if (!numId) {
    return <p>Invalid item ID</p>;
  }

  const {
    data: item,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['item', numId],
    queryFn: () => {
      return getDetails(numId);
    },
  });

  const oneClose = () => {
    router.push(`/${locale}/${page}`);
  };

  if (isLoading) return <p>Loading details...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!item) return <p>Item not found</p>;

  return (
    <div>
      <h2>{t('details')}</h2>
      <p>#{numId}</p>
      <p>
        {t('type')}: {item.type}
      </p>
      <button onClick={oneClose}>{t('close')}</button>
    </div>
  );
}
