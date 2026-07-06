import type { Metadata } from 'next';
import { SectionIntro } from '@/components/SectionIntro';
import { PageSection } from '@/components/PageSection';
import { ContactForm } from '@/components/ContactForm';
import { TypographyBody, TypographyLabel } from '@/components/typography';
import { editorial } from '@/lib/typography';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact — Giuseppe Fioretti',
  description: 'Service inquiries, artwork requests, UREES and collaborations.',
};

export default function ContactPage() {
  return (
    <PageSection className="contact-page">
      <div className="grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionIntro
            kicker="Contact"
            title="Start a conversation"
            description="Whether it's a brand project, an artwork or a UREES piece — every collaboration begins here."
          />
          <div className={`${editorial.stack.leadToContent} space-y-8`}>
            <div>
              <TypographyLabel>Email</TypographyLabel>
              <a href={`mailto:${SITE.email}`} className={`${editorial.stack.labelToTitle} block text-blue no-underline hover:underline`}>
                <TypographyBody measure={false}>{SITE.email}</TypographyBody>
              </a>
            </div>
            <div>
              <TypographyLabel>Instagram</TypographyLabel>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={`${editorial.stack.labelToTitle} block text-blue no-underline hover:underline`}
              >
                <TypographyBody measure={false}>@fiogiuseppe</TypographyBody>
              </a>
            </div>
            <div>
              <TypographyLabel>Based in</TypographyLabel>
              <TypographyBody measure={false} className={editorial.stack.labelToTitle}>
                {SITE.location}
              </TypographyBody>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </PageSection>
  );
}
