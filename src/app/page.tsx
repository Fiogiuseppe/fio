import { SpiritualHero } from '@/components/SpiritualHero';
import { BioSection } from '@/components/BioSection';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { WorksGrid, HobbiesSection, WorkshopSection } from '@/components/HobbiesSection';
import { ContactSection } from '@/components/ContactSection';
import { SiteFooter } from '@/components/SiteFooter';

export default function HomePage() {
  return (
    <>
      <SpiritualHero />
      <main>
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
