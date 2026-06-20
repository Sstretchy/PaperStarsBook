import { Check } from 'lucide-react';
import Promo from '../../assets/10.webp';
import { useTranslations } from '../../i18n';

export function WhatIsIncludedSection() {
  const t = useTranslations();

  return (
    <section className='landing-section py-24 px-8'>
      <div className='surface-card-lg max-w-[1200px] mx-auto rounded-3xl overflow-hidden grid lg:grid-cols-2'>
        <div className='p-12 flex flex-col gap-8'>
          <div>
            <p className='section-eyebrow'>{t.included.eyebrow}</p>
            <h2 className='section-title-sm'>{t.included.title}</h2>
          </div>

          <ul className='flex flex-col gap-4'>
            {t.included.features.map((feature) => (
              <li key={feature.text} className='flex items-start gap-3'>
                <div className='icon-dot w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                  <Check size={13} className='icon-primary' strokeWidth={2.5} />
                </div>
                <div className='flex items-baseline gap-2 flex-wrap'>
                  <span className='feature-text'>{feature.text}</span>
                  {feature.note && (
                    <span className='badge-note px-2 py-0.5 rounded-full'>
                      {feature.note}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <p className='section-copy-xs'>{t.included.deliveryNote}</p>
        </div>

        <div className='included-visual relative flex items-center justify-center min-h-64 lg:min-h-0'>
          <img
            className='hidden lg:block full-image'
            src={Promo}
            alt={t.included.imageAlt}
            loading='lazy'
            decoding='async'
          />

          <div className='quote-panel absolute bottom-6 left-6 right-6 py-4 px-5 rounded-2xl text-center'>
            <span className='quote-text'>«{t.included.quote}»</span>
          </div>
        </div>
      </div>
    </section>
  );
}
