import { useEffect, useRef, useState } from 'react';
import { AlertCircle, Check, Copy, Link2, Share2 } from 'lucide-react';

interface ShareBarProps {
  title: string;
  slug: string;
}

type CopyState = 'idle' | 'copied' | 'manual';

export function ShareBar({ title, slug }: ShareBarProps) {
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const manualInputRef = useRef<HTMLInputElement | null>(null);

  const supportsWebShare =
    typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const getShareUrl = () => {
    if (typeof window === 'undefined') return `#article/${slug}`;
    return `${window.location.origin}${window.location.pathname}#article/${slug}`;
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (copyState === 'manual' && manualInputRef.current) {
      manualInputRef.current.focus();
      manualInputRef.current.select();
    }
  }, [copyState]);

  const scheduleReset = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setCopyState('idle');
    }, 2500);
  };

  const fallbackExecCommandCopy = (text: string): boolean => {
    if (typeof document === 'undefined') return false;
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.left = '-9999px';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);

    const selection = document.getSelection();
    const previousRange =
      selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

    textarea.select();
    textarea.setSelectionRange(0, text.length);

    let succeeded = false;
    try {
      succeeded = document.execCommand('copy');
    } catch {
      succeeded = false;
    }

    document.body.removeChild(textarea);
    if (previousRange && selection) {
      selection.removeAllRanges();
      selection.addRange(previousRange);
    }

    return succeeded;
  };

  const handleCopyLink = async () => {
    const url = getShareUrl();
    setShareFeedback(null);

    if (
      typeof navigator !== 'undefined' &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === 'function' &&
      window.isSecureContext
    ) {
      try {
        await navigator.clipboard.writeText(url);
        setCopyState('copied');
        scheduleReset();
        return;
      } catch {
        // Fall through to execCommand fallback
      }
    }

    const fallbackOk = fallbackExecCommandCopy(url);
    if (fallbackOk) {
      setCopyState('copied');
      scheduleReset();
      return;
    }

    // Both programmatic copy methods failed — never claim "Link Copied"
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    setCopyState('manual');
  };

  const handleNativeShare = async () => {
    if (!supportsWebShare) return;
    setShareFeedback(null);
    const url = getShareUrl();

    try {
      await navigator.share({
        title,
        text: title,
        url,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
      setShareFeedback('System share dialog is unavailable here. Use Copy Link instead.');
    }
  };

  const shareUrl = getShareUrl();

  return (
    <div className="space-y-3 border-y border-slate-200 py-3.5 dark:border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
          <Share2 className="h-4 w-4" aria-hidden="true" />
          <span>Share this essay</span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {supportsWebShare && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="inline-flex min-h-[38px] items-center gap-1.5 border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:focus-visible:ring-blue-400"
            >
              <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Share</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopyLink}
            aria-live="polite"
            className="inline-flex min-h-[38px] items-center gap-1.5 border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:focus-visible:ring-blue-400"
          >
            {copyState === 'copied' ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          <a
            href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Reading: ${title}\n${shareUrl}`)}`}
            className="inline-flex min-h-[38px] items-center border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:focus-visible:ring-blue-400"
          >
            Email
          </a>
        </div>
      </div>

      {copyState === 'manual' && (
        <div
          role="status"
          aria-live="polite"
          className="space-y-1.5 border border-amber-300/80 bg-amber-50/70 p-3 text-xs text-slate-800 dark:border-amber-700/60 dark:bg-amber-950/30 dark:text-amber-100"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 font-medium">
              <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-700 dark:text-amber-300" aria-hidden="true" />
              Automatic clipboard access was blocked. Copy this link manually:
            </span>
            <button
              type="button"
              onClick={() => setCopyState('idle')}
              className="text-[11px] font-semibold underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544]"
            >
              Dismiss
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Copy className="h-3.5 w-3.5 shrink-0 text-slate-500 dark:text-slate-400" aria-hidden="true" />
            <input
              ref={manualInputRef}
              type="text"
              readOnly
              value={shareUrl}
              aria-label="Article URL for manual copying"
              onFocus={(e) => e.currentTarget.select()}
              className="w-full border border-slate-300 bg-white px-2.5 py-1.5 font-mono text-[11px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F2544] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
        </div>
      )}

      {shareFeedback && (
        <p role="status" aria-live="polite" className="text-xs text-amber-700 dark:text-amber-300">
          {shareFeedback}
        </p>
      )}
    </div>
  );
}
