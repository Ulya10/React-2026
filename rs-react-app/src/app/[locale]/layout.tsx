import type { Metadata } from 'next';
import Providers from './providers';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Joke App',
  description: 'Explore and have fun. In English',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
