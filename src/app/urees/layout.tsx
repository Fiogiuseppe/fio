import { Jost } from 'next/font/google';
import type { Metadata } from 'next';
import { UreesFooter } from '@/components/urees/UreesFooter';
import { UreesHeader } from '@/components/urees/UreesHeader';
import { UreesPortal } from '@/components/urees/UreesPortal';
import './urees.css';

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-urees',
});

export const metadata: Metadata = {
  title: 'Urees® Barcelona — Handmade clothes created with upcycling',
  description:
    'Explore handmade pants from Barcelona. At UREES, we breathe new life into pre-loved garments through upcycling.',
  icons: {
    icon: [{ url: '/icons/urees-favicon.png', sizes: '32x32', type: 'image/png' }],
    apple: [{ url: '/icons/urees-favicon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function UreesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`urees-root ${jost.variable}`}>
      <UreesPortal />
      <UreesHeader />
      <main>{children}</main>
      <UreesFooter />
    </div>
  );
}
