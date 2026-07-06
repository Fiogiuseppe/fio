import { SiteHeader } from '@/components/SiteHeader';
import { SpiritualHero } from '@/components/SpiritualHero';
import { BioSection } from '@/components/BioSection';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { WorksGrid } from '@/components/WorksGrid';
import { HobbiesSection } from '@/components/HobbiesSection';
import { WorkshopSection } from '@/components/WorkshopSection';
import { ContactSection } from '@/components/ContactSection';
import { SiteFooter } from '@/components/SiteFooter';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <SpiritualHero />
        <BioSection />
        <FeaturedProjects />
        <WorksGrid />
        <HobbiesSection />
        <WorkshopSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
