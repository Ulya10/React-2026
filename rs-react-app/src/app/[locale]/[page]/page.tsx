import HomePage from '@/components/Home';
import { getItems } from '@/app/actions';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; page: string }>;
}) {
  const { page } = await params;
  const initialData = await getItems();
  return <HomePage page={page} initialData={initialData} />;
}
