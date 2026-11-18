import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { PolicyDocument } from '../../types/editorial';
import { siteConfig } from '../../config/siteConfig';

interface PolicyModalProps {
  document: PolicyDocument | null;
  onClose: () => void;
}

export function PolicyModal({ document: policyDoc, onClose }: PolicyModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!policyDoc) return;
    previousFocusRef.current = window.document.activeElement as HTMLElement | null;
    const previousOverflow = window.document.body.style.overflow;
    window.document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 20);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && window.document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && window.document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      window.document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [policyDoc, onClose]);

  if (!policyDoc) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto border border-slate-200 bg-white p-6 shadow-2xl sm:p-8 dark:border-slate-800 dark:bg-[#111827]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
          <div>
            <p className="text-xs font-medium tracking-wide text-slate-600 dark:text-slate-400">
              {siteConfig.publicationName} · Updated {policyDoc.lastUpdated}
            </p>
            <h2
              id="policy-modal-title"
              className="mt-1 font-serif text-2xl font-semibold text-slate-900 dark:text-slate-100"
            >
              {policyDoc.title}
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {policyDoc.subtitle}
            </p>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close document"
            className="flex h-10 w-10 shrink-0 items-center justify-center text-slate-500 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:text-slate-400 dark:hover:text-white dark:focus-visible:ring-blue-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {policyDoc.sections.map((section) => (
            <section key={section.heading}>
              <h3 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
                {section.heading}
              </h3>
              <div className="mt-2 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {section.body.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          {policyDoc.id === 'contact' && (
            <div className="border-t border-slate-200 pt-4 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
              <span className="font-medium text-slate-900 dark:text-slate-100">
                Placeholder Editorial Desk Email:{' '}
              </span>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="underline decoration-slate-300 underline-offset-4 hover:text-[#0F2544] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:decoration-slate-700 dark:hover:text-blue-300 dark:focus-visible:ring-blue-400"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end border-t border-slate-200 pt-4 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#0F2544] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#173660] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus-visible:ring-blue-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
