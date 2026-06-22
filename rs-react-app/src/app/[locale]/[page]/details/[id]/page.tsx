import HomePage from '@/components/Home';

export default async function Page({ params }: { params: Promise<{ page: string; id: string }> }) {
    const { page, id } = await params;
  return <HomePage page={page} detailsId={id} />;
}