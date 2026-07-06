import type { Metadata } from 'next';
import { SectionIntro } from '@/components/SectionIntro';
import { PageSection } from '@/components/PageSection';
import { ContactForm } from '@/components/ContactForm';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact — Giuseppe Fioretti',
  description: 'Service inquiries, artwork requests, UREES and collaborations.',
};

export default function ContactPage() {
  return (
    <PageSection>
      <div className="grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionIntro
            kicker="Contact"
            title="Start a conversation"
            description="Whether it's a brand project, an artwork or a UREES piece — every collaboration begins here."
          />
          <div className="mt-10 space-y-6 text-ink/70">
            <div>
              <p className="text-xs uppercase tracking-widest text-ink/50">Email</p>
              <a href={`mailto:${SITE.email}`} className="mt-1 block text-lg text-blue hover:underline">
                {SITE.email}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-ink/50">Instagram</p>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-lg text-blue hover:underline"
              >
                @fiogiuseppe
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-ink/50">Based in</p>
              <p className="mt-1 text-lg">{SITE.location}</p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </PageSection>
  );
}
