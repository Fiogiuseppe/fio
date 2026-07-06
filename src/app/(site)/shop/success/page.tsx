import Link from 'next/link';
import { CTA } from '@/components/CTA';
import { TypographyBody, TypographyLead, TypographySection } from '@/components/typography';
import { editorial } from '@/lib/typography';

export default function ShopSuccessPage() {
  return (
    <section className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-2xl">
        <TypographySection as="h1">Thank you for your order</TypographySection>
        <TypographyLead measure={false} className={editorial.stack.titleToLead}>
          Your payment was successful. Giuseppe will prepare your piece and ship it to the address
          you provided at checkout.
        </TypographyLead>
        <TypographyBody className={editorial.stack.sectionToContent}>
          You will receive a confirmation email from Stripe with your receipt. If you have any
          questions about your order, reach out anytime.
        </TypographyBody>
        <div className={`flex flex-wrap gap-4 ${editorial.stack.block}`}>
          <CTA href="/shop" label="Back to shop" />
          <CTA href="/contact" label="Contact" variant="secondary" />
        </div>
        <TypographyBody measure={false} className={editorial.stack.block}>
          <Link href="/shop" className="text-blue">
            Continue browsing
          </Link>
        </TypographyBody>
      </div>
    </section>
  );
}
