import { User, Feather, BookOpen } from 'lucide-react';
import { useTranslations } from '../../i18n';

const icons = [User, Feather, BookOpen];

export function WhatIsItSection() {
  const t = useTranslations();

  return (
    <section className='landing-section landing-section-bg py-24 px-8'>
      <div className='max-w-[1200px] mx-auto'>
        <div className='text-center mb-16'>
          <p className='section-eyebrow'>{t.whatIsIt.eyebrow}</p>
          <h2 className='section-title'>{t.whatIsIt.title}</h2>
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
          {t.whatIsIt.cards.map((card, index) => {
            const Icon = icons[index];

            return (
              <div
                key={card.title}
                className='surface-card-soft flex flex-col gap-5 p-8 rounded-3xl transition-all duration-300'
              >
                <div className='icon-tile w-14 h-14 rounded-2xl flex items-center justify-center'>
                  <Icon size={24} className='icon-primary' />
                </div>
                <h3 className='card-title'>{card.title}</h3>
                <p className='section-copy-sm'>{card.text}</p>
              </div>
            );
          })}
        </div>

        <div className='surface-note mt-10 mx-auto max-w-[720px] text-center py-5 px-8 rounded-2xl'>
          <p className='feature-text'>
            {t.whatIsIt.note}{' '}
            <span className='font-semibold'>{t.whatIsIt.noteEmphasis}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
