import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Joke App',
  description: 'Explore and have fun. In English',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
