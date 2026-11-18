import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClassName?: string;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
}

const LOCAL_ASSET_PREFIX = '/src/assets/images/';

function getResponsiveWebpSources(src: string) {
  if (!src.startsWith(LOCAL_ASSET_PREFIX) || !src.endsWith('.jpg')) {
    return null;
  }
  const base = src.slice(0, -4);
  const fullWidth = src.includes('hero_') ? 1376 : 1200;
  return {
    srcSet: `${base}-480w.webp 480w, ${base}-768w.webp 768w, ${base}.webp ${fullWidth}w`,
  };
}

export function EditorialImage({
  src,
  alt,
  className = '',
  aspectClassName = 'aspect-[4/3]',
  priority = false,
  sizes = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
  width,
  height,
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);
  const webp = getResponsiveWebpSources(src);
  const defaultWidth = width ?? (src.includes('hero_') ? 1376 : 1200);
  const defaultHeight = height ?? (src.includes('hero_') ? 768 : 896);

  return (
    <div
      className={`relative overflow-hidden bg-[#EBEEF3] dark:bg-[#131D2E] ${aspectClassName} ${className}`}
    >
      {!hasError ? (
        <picture className="block h-full w-full">
          {webp && <source type="image/webp" srcSet={webp.srcSet} sizes={sizes} />}
          <img
            src={src}
            alt={alt}
            width={defaultWidth}
            height={defaultHeight}
            sizes={sizes}
            referrerPolicy="no-referrer"
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            fetchPriority={priority ? 'high' : 'auto'}
            onError={() => setHasError(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        </picture>
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#EEF2F6] to-[#DDE4EE] p-6 text-center dark:from-[#121C2D] dark:to-[#0C1320]"
        >
          <BookOpen className="h-6 w-6 text-[#0F2544]/60 dark:text-slate-400" strokeWidth={1.5} />
          <span className="max-w-xs text-xs font-medium text-slate-600 dark:text-slate-400">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
}
