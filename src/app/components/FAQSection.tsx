import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useTranslations } from '../../i18n';

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const t = useTranslations();

  return (
    <section className='landing-section landing-section-muted py-24 px-8'>
      <div className='max-w-[800px] mx-auto'>
        <div className='text-center mb-16'>
          <p className='section-eyebrow'>{t.faq.eyebrow}</p>
          <h2 className='section-title'>{t.faq.title}</h2>
        </div>

        <div className='flex flex-col gap-3'>
          {t.faq.items.map((faq, i) => {
            const isOpen = open === i;

            return (
              <div
                key={faq.q}
                className={`faq-item rounded-2xl overflow-hidden ${isOpen ? 'faq-item-open' : ''}`}
              >
                <button
                  className='faq-trigger w-full flex items-center justify-between gap-4 p-6 text-left'
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className='faq-question'>{faq.q}</span>
                  <div
                    className={`faq-icon-wrap w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isOpen ? 'faq-icon-wrap-open' : ''}`}
                  >
                    {isOpen ? (
                      <Minus size={14} className='text-[var(--primary-foreground)]' />
                    ) : (
                      <Plus size={14} className='icon-primary' />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className='px-6 pb-6'>
                    <p className='section-copy-sm'>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
