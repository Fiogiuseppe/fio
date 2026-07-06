import type { Metadata } from 'next';
import { SITE } from '@/data/site';
import './globals.css';

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  metadataBase: new URL('https://fiogiuseppe.vercel.app'),
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: 'https://fiogiuseppe.vercel.app',
    siteName: SITE.name,
    locale: 'it_IT',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
