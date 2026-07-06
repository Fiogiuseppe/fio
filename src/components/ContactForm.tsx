'use client';

import { useState } from 'react';
import {
  TypographyBody,
  TypographyButton,
  TypographyH3,
  TypographyLabel,
  TypographyLead,
} from '@/components/typography';
import { editorial } from '@/lib/typography';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-ink/10 bg-cream-soft p-8 md:p-12">
        <TypographyH3>Message received</TypographyH3>
        <TypographyLead measure={false} className={editorial.stack.labelToTitle}>
          Thank you — Giuseppe will be in touch soon.
        </TypographyLead>
      </div>
    );
  }

  const fieldClass =
    'w-full border-b border-ink/20 bg-transparent py-3 font-helvetica text-base outline-none focus:border-blue';

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <TypographyLabel as="label" htmlFor="name" className="mb-2 block">
            Name
          </TypographyLabel>
          <input id="name" name="name" type="text" required className={fieldClass} />
        </div>
        <div>
          <TypographyLabel as="label" htmlFor="email" className="mb-2 block">
            Email
          </TypographyLabel>
          <input id="email" name="email" type="email" required className={fieldClass} />
        </div>
      </div>

      <div>
        <TypographyLabel as="label" htmlFor="type" className="mb-2 block">
          Inquiry type
        </TypographyLabel>
        <select id="type" name="type" required className={fieldClass} defaultValue="">
          <option value="" disabled>
            Select...
          </option>
          <option value="service">Service inquiry</option>
          <option value="artwork">Artwork request</option>
          <option value="urees">UREES inquiry</option>
          <option value="collaboration">Collaboration</option>
        </select>
      </div>

      <div>
        <TypographyLabel as="label" htmlFor="message" className="mb-2 block">
          Message
        </TypographyLabel>
        <textarea id="message" name="message" rows={5} required className={`${fieldClass} resize-none`} />
      </div>

      <button
        type="submit"
        className="border border-ink bg-ink px-8 py-3 text-cream transition hover:border-blue hover:bg-blue"
      >
        <TypographyButton as="span">Send message</TypographyButton>
      </button>
    </form>
  );
}
