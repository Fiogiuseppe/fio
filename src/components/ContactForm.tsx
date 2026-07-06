'use client';

import { useState } from 'react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Prepared for Resend / API route integration
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-ink/10 bg-cream-soft p-8 md:p-12">
        <p className="font-display text-2xl">Message received.</p>
        <p className="mt-3 text-ink/70">Thank you — Giuseppe will be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-widest text-ink/50">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full border-b border-ink/20 bg-transparent py-3 outline-none focus:border-blue"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-widest text-ink/50">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full border-b border-ink/20 bg-transparent py-3 outline-none focus:border-blue"
          />
        </div>
      </div>

      <div>
        <label htmlFor="type" className="mb-2 block text-xs uppercase tracking-widest text-ink/50">
          Inquiry type
        </label>
        <select
          id="type"
          name="type"
          required
          className="w-full border-b border-ink/20 bg-transparent py-3 outline-none focus:border-blue"
          defaultValue=""
        >
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
        <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-widest text-ink/50">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full resize-none border-b border-ink/20 bg-transparent py-3 outline-none focus:border-blue"
        />
      </div>

      <button
        type="submit"
        className="border border-ink bg-ink px-8 py-3 text-sm uppercase tracking-widest text-cream transition hover:bg-blue hover:border-blue"
      >
        Send message
      </button>
    </form>
  );
}
