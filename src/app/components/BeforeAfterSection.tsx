import { useRef, useState, useCallback, useEffect } from 'react';
import {
  ChevronsLeftRight,
  Wand2,
  Eye,
  Printer,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import BeforeOne from '../../assets/before1.webp';
import AfterOne from '../../assets/after1.webp';
import BeforeTwo from '../../assets/before11.webp';
import AfterTwo from '../../assets/after11.webp';
import BeforeThree from '../../assets/before111.webp';
import AfterThree from '../../assets/after111.webp';
import { useTranslations, type MessageCatalog } from '../../i18n';

const images = [
  { before: BeforeOne, after: AfterOne },
  { before: BeforeTwo, after: AfterTwo },
  { before: BeforeThree, after: AfterThree },
];

const highlightIcons = [Wand2, Eye, Printer];

function Slider({
  example,
  t,
}: {
  example: { before: string; after: string };
  t: MessageCatalog['beforeAfter'];
}) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getPos = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return 50;
    const rect = container.getBoundingClientRect();
    return Math.min(
      100,
      Math.max(0, ((clientX - rect.left) / rect.width) * 100)
    );
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition(getPos(e.clientX));
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      setPosition(getPos(e.touches[0].clientX));
    };

    const onUp = () => setIsDragging(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [getPos, isDragging]);

  useEffect(() => {
    if (hasInteracted) return;

    setPosition(50);
    let frame: number;
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const phase = ((timestamp - start) % 3600) / 1800;
      const ease = phase <= 1 ? phase : 2 - phase;
      setPosition(42 + ease * 16);
      frame = requestAnimationFrame(animate);
    };

    const timer = setTimeout(() => {
      frame = requestAnimationFrame(animate);
    }, 900);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [example, hasInteracted]);

  const startDrag = (clientX: number) => {
    setIsDragging(true);
    setHasInteracted(true);
    setPosition(getPos(clientX));
  };

  return (
    <div
      ref={containerRef}
      className='before-after-shell relative overflow-hidden rounded-2xl select-none w-full'
      style={{
        cursor: isDragging ? 'grabbing' : 'col-resize',
      }}
      onClick={(e) => {
        if (!isDragging) {
          setHasInteracted(true);
          setPosition(getPos(e.clientX));
        }
      }}
    >
      <img
        src={example.after}
        alt={t.afterImageAlt}
        draggable={false}
        className='before-after-image'
        loading='lazy'
        decoding='async'
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      >
        <img
          src={example.before}
          alt={t.beforeImageAlt}
          draggable={false}
          className='before-after-image'
          loading='lazy'
          decoding='async'
        />
        <div className='before-after-before-overlay' />
      </div>

      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${position}%`,
          transform: 'translateX(-50%)',
          width: '2px',
          background: 'rgba(196,132,74,0.95)',
          pointerEvents: 'none',
          boxShadow: '0 0 12px rgba(196,132,74,0.55)',
        }}
      />

      <div
        onMouseDown={(e) => {
          e.preventDefault();
          startDrag(e.clientX);
        }}
        onTouchStart={(e) => startDrag(e.touches[0].clientX)}
        style={{
          position: 'absolute',
          top: '50%',
          left: `${position}%`,
          transform: 'translate(-50%, -50%)',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isDragging ? 'grabbing' : 'grab',
          boxShadow: isDragging
            ? '0 6px 24px rgba(196,132,74,0.65), 0 0 0 4px rgba(196,132,74,0.2)'
            : '0 4px 18px rgba(196,132,74,0.55), 0 0 0 3px rgba(255,251,246,0.95)',
          transition: isDragging ? 'box-shadow 0.1s' : 'box-shadow 0.2s',
          zIndex: 10,
          userSelect: 'none',
        }}
      >
        <ChevronsLeftRight
          size={22}
          className='text-[var(--primary-foreground)]'
          strokeWidth={2}
        />
      </div>

      <div
        className='before-after-label absolute top-3.5 left-3.5'
        style={{ opacity: position < 12 ? 0 : 1 }}
      >
        <div className='before-after-label-card before-after-label-card-dark'>
          <div className='before-after-label-title'>{t.beforeTitle}</div>
          <div className='before-after-label-copy before-after-label-copy-dark'>
            {t.beforeLabel}
          </div>
        </div>
      </div>

      <div
        className='before-after-label absolute top-3.5 right-3.5'
        style={{ opacity: position > 88 ? 0 : 1 }}
      >
        <div className='before-after-label-card before-after-label-card-light'>
          <div className='before-after-label-title text-right'>{t.afterTitle}</div>
          <div className='before-after-label-copy before-after-label-copy-light'>
            {t.afterLabel}
          </div>
        </div>
      </div>

      {!hasInteracted && (
        <div className='absolute bottom-3.5 left-1/2 -translate-x-1/2'>
          <div className='before-after-hint'>
            <span className='before-after-hint-text'>{t.dragHint}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function BeforeAfterSection() {
  const [current, setCurrent] = useState(0);
  const t = useTranslations().beforeAfter;
  const total = images.length;

  const prev = () => setCurrent((value) => (value - 1 + total) % total);
  const next = () => setCurrent((value) => (value + 1) % total);

  return (
    <section className='landing-section landing-section-bg py-24 px-8'>
      <div className='max-w-[1200px] mx-auto flex flex-col gap-14'>
        <div className='text-center flex flex-col gap-4'>
          <p className='section-eyebrow'>{t.eyebrow}</p>
          <h2 className='section-title'>{t.title}</h2>
          <p className='section-copy max-w-[600px] mx-auto'>{t.copy}</p>
        </div>

        <div className='flex flex-col gap-4 items-center'>
          <Slider key={current} example={images[current]} t={t} />

          <div className='flex items-center justify-between gap-4'>
            <div className='flex items-center gap-3'>
              <button
                onClick={prev}
                aria-label={t.prevExampleAria}
                className='carousel-nav-button'
              >
                <ChevronLeft size={17} className='text-[var(--foreground)]' />
              </button>

              <div className='flex items-center gap-2'>
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`${t.exampleAria} ${i + 1}`}
                    className={`carousel-dot ${i === current ? 'carousel-dot-active' : 'carousel-dot-idle'}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label={t.nextExampleAria}
                className='carousel-nav-button'
              >
                <ChevronRight size={17} className='text-[var(--foreground)]' />
              </button>
            </div>
          </div>
        </div>

        <div className='grid sm:grid-cols-3 gap-5'>
          {t.highlights.map((item, index) => {
            const Icon = highlightIcons[index];

            return (
              <div
                key={item.title}
                className='surface-card rounded-2xl p-6 flex flex-col gap-3'
              >
                <div className='icon-tile w-10 h-10 rounded-xl flex items-center justify-center'>
                  <Icon size={19} className='icon-primary' />
                </div>
                <div className='flex flex-col gap-1'>
                  <span className='card-title-sm'>{item.title}</span>
                  <p className='section-copy-sm'>{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        <p className='section-copy-xs text-center'>
          {t.footnote}{' '}
          <span className='before-after-footnote-emphasis'>
            {t.footnoteEmphasis}
          </span>
        </p>
      </div>
    </section>
  );
}
