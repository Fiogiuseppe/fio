import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { UreesFlyingSticker } from '@/components/UreesFlyingSticker';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <UreesFlyingSticker />
    </div>
  );
}
