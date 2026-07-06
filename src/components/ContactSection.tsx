'use client';

import { FormEvent, useMemo, useState } from 'react';
import { SITE } from '@/data/site';
import styles from './ContactSection.module.css';

function randomCaptcha() {
  const a = Math.floor(Math.random() * 8) + 2;
  const b = Math.floor(Math.random() * 8) + 2;
  return { a, b, answer: a + b };
}

export function ContactSection() {
  const captcha = useMemo(() => randomCaptcha(), []);
  const [captchaValue, setCaptchaValue] = useState('');
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '');
    const email = String(data.get('email') ?? '');
    const message = String(data.get('message') ?? '');

    if (Number(captchaValue) !== captcha.answer) {
      setStatus('error');
      return;
    }

    const subject = encodeURIComponent(`Message from ${name || 'fiogiuseppe.com'}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${SITE.contactEmail}?subject=${subject}&body=${body}`;
    setStatus('sent');
    form.reset();
    setCaptchaValue('');
  }

  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-title">
      <div className={styles.inner}>
        <p className={styles.lead}>
          Let&apos;s talk <em>here.</em>
        </p>
        <h1 className={styles.heading} id="contact-title">
          Write me here
        </h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="name">Name</label>
              <input className={styles.input} id="name" name="name" placeholder="Name" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                className={styles.input}
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="message">Message</label>
            <textarea className={styles.textarea} id="message" name="message" placeholder="Message" required />
          </div>
          <div className={styles.actions}>
            <div className={styles.captcha}>
              <span>
                {captcha.a} + {captcha.b} =
              </span>
              <input
                className={styles.captchaInput}
                inputMode="numeric"
                value={captchaValue}
                onChange={(event) => setCaptchaValue(event.target.value)}
                required
                aria-label="Captcha answer"
              />
            </div>
            <button className={styles.submit} type="submit">
              Send
            </button>
          </div>
          {status === 'error' && <p className={styles.status}>Captcha incorrect. Try again.</p>}
          {status === 'sent' && <p className={styles.status}>Opening your email client…</p>}
        </form>
      </div>
    </section>
  );
}
