'use client';

import { getDetails } from '../api/api';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function DetailsSection({
  id,
  page,
}: {
  id: string;
  page: string;
}) {
  const locale = useLocale();

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
      <h2>Details</h2>
      <p>Item #{numId}</p>
      <p>Type: {item.type}</p>
      <button onClick={oneClose}>Close</button>
    </div>
  );
}
