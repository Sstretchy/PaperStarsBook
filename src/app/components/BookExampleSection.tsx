import { useState } from 'react';
import { useLocale, useTranslations } from '../../i18n';

// Книжки с иллюстрациями на весь разворот: показываем страницы широко, по одной в ряд.
const SPREAD_BOOKS = ['forest'];

const bookPages = import.meta.glob<string>('../../assets/books/*/*.webp', {
  eager: true,
  import: 'default',
});

function pagesFor(bookId: string) {
  return Object.keys(bookPages)
    .filter((path) => path.includes(`/books/${bookId}/`))
    .sort()
    .map((path) => bookPages[path]);
}

export function BookExampleSection() {
  const t = useTranslations();
  const { locale } = useLocale();
  const [activeId, setActiveId] = useState<string>(t.examples.books[0].id);
  const [zoomed, setZoomed] = useState<string | null>(null);

  const book =
    t.examples.books.find((item) => item.id === activeId) ?? t.examples.books[0];
  const pages = pagesFor(book.id);
  const isSpread = SPREAD_BOOKS.includes(book.id);

  return (
    <section
      className='landing-section landing-section-muted py-24 px-8'
      data-locale={locale}
    >
      {zoomed && (
        <div onClick={() => setZoomed(null)} className='preview-modal'>
          <button
            onClick={() => setZoomed(null)}
            className='preview-modal-close'
            aria-label={t.examples.closeLabel}
          >
            x
          </button>
          <img
            src={zoomed}
            alt={t.examples.imageAlt}
            onClick={(e) => e.stopPropagation()}
            className='preview-modal-image'
          />
        </div>
      )}

      <div className='max-w-[1200px] mx-auto'>
        <div className='text-center mb-10'>
          <p className='section-eyebrow'>{t.examples.eyebrow}</p>
          <h2 className='section-title'>{t.examples.title}</h2>
          <p className='section-copy mt-3'>{t.examples.copy}</p>
        </div>

        <div className='flex flex-wrap justify-center gap-3 mb-8'>
          {t.examples.books.map((item) => {
            const active = item.id === book.id;

            return (
              <button
                key={item.id}
                type='button'
                onClick={() => setActiveId(item.id)}
                aria-pressed={active}
                className={`cursor-pointer rounded-full border px-5 py-3 text-base font-semibold transition-colors ${
                  active
                    ? 'border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]'
                    : 'border-[var(--border)] bg-[rgba(255,251,246,0.82)] text-[var(--foreground)]'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        <div className='surface-card-soft rounded-3xl p-6 md:p-8 flex flex-col gap-6'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3'>
            <p className='section-copy-sm max-w-[640px]'>{book.text}</p>
            <span className='self-start md:self-auto rounded-full border border-[var(--border)] px-4 py-1.5 text-base font-semibold whitespace-nowrap'>
              {t.examples.tariffLabel}: {book.tariff}
            </span>
          </div>

          <div
            className={
              isSpread
                ? 'grid grid-cols-1 gap-4'
                : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'
            }
          >
            {pages.map((src, index) => (
              <button
                key={src}
                type='button'
                onClick={() => setZoomed(src)}
                className='preview-card cursor-zoom-in rounded-2xl overflow-hidden p-0'
              >
                <img
                  src={src}
                  alt={`${t.examples.imageAlt} ${index + 1}`}
                  className='full-image'
                  width={isSpread ? 1800 : 720}
                  height={isSpread ? 1273 : 1018}
                  loading='lazy'
                  decoding='async'
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
