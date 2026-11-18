import { FormEvent, useState } from 'react';
import { CheckCircle2, Mail } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

    if (!isValidEmail) {
      setStatus('error');
      setMessage('Please enter a valid email address to preview the subscription state.');
      return;
    }

    setStatus('success');
    setMessage(
      `Preview confirmed for ${trimmed}. This is a frontend-only demonstration; no subscription was sent.`
    );
    setEmail('');
  };

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-heading"
      className="scroll-mt-20 border-t border-slate-200 bg-[#0F2544] py-14 text-white sm:py-16 dark:border-slate-800 dark:bg-[#0E182B]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold tracking-wider text-[#E0B36A] uppercase">
              {siteConfig.newsletter.eyebrow}
            </p>
            <h2
              id="newsletter-heading"
              className="mt-2 font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              {siteConfig.newsletter.heading}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">
              {siteConfig.newsletter.description}
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubmit} noValidate className="space-y-3">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Mail
                    className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                  />
                  <input
                    id="newsletter-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    aria-invalid={status === 'error'}
                    aria-describedby={status !== 'idle' ? 'newsletter-feedback' : 'newsletter-disclaimer'}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status !== 'idle') setStatus('idle');
                    }}
                    placeholder={siteConfig.newsletter.placeholder}
                    className="h-12 w-full border border-white/25 bg-white/10 pr-4 pl-10 text-sm text-white placeholder:text-slate-300 focus:border-white focus:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  />
                </div>
                <button
                  type="submit"
                  className="h-12 shrink-0 whitespace-nowrap bg-white px-7 text-sm font-semibold text-[#0F2544] transition-colors duration-150 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F2544]"
                >
                  {siteConfig.newsletter.ctaLabel}
                </button>
              </div>

              {status === 'error' && (
                <p id="newsletter-feedback" role="alert" aria-live="assertive" className="text-xs font-medium text-amber-200">
                  {message}
                </p>
              )}

              {status === 'success' && (
                <div
                  id="newsletter-feedback"
                  role="status"
                  aria-live="polite"
                  className="flex items-start gap-2 border border-white/20 bg-white/10 p-3 text-xs text-slate-100"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                  <span>{message}</span>
                </div>
              )}

              <p id="newsletter-disclaimer" className="text-xs text-slate-300">
                {siteConfig.newsletter.disclaimer}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
