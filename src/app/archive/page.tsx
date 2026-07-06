import { SpiritualHero } from '@/components/SpiritualHero';
import { BioSection } from '@/components/BioSection';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { WorksGrid, HobbiesSection, WorkshopSection } from '@/components/HobbiesSection';
import { ContactSection } from '@/components/ContactSection';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata = {
  title: 'Archive — Original WordPress clone',
  robots: { index: false },
};

export default function ArchivePage() {
  return (
    <div className="legacy-archive">
      <SpiritualHero />
      <BioSection />
      <FeaturedProjects />
      <WorksGrid />
      <HobbiesSection />
      <WorkshopSection />
      <ContactSection />
      <SiteFooter />
    </div>
  );
}
