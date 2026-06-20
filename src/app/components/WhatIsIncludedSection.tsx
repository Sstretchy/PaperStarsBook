import { Check } from 'lucide-react';
import Promo from '../../assets/10.webp';

const features = [
  { text: 'Индивидуальный сюжет, созданный не по шаблону', note: '' },
  { text: 'Сделаю всё сама, если у вас нет сил согласовывать идеи', note: '' },
  { text: 'От 12 готовых сказочных страниц', note: '' },
  { text: 'Работа с фотографиями ребёнка и максимальным сохранением узнаваемости', note: '' },
  { text: 'Ручная сборка страниц через Photoshop и точные промты', note: '' },
  { text: 'Присылаю исходные изображения страниц', note: '' },
  { text: 'Одна правка по результату в конце включена в стоимость', note: '' },
  { text: 'Помощь с печатью и доставкой по Еревану', note: 'за доп. плату' },
];

export function WhatIsIncludedSection() {
  return (
    <section className='landing-section py-24 px-8'>
      <div className='surface-card-lg max-w-[1200px] mx-auto rounded-3xl overflow-hidden grid lg:grid-cols-2'>
        <div className='p-12 flex flex-col gap-8'>
          <div>
            <p className='section-eyebrow'>Состав услуги</p>
            <h2 className='section-title-sm'>Что входит в книжку</h2>
          </div>

          <ul className='flex flex-col gap-4'>
            {features.map((feature) => (
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

          <p className='section-copy-xs'>Доставка доступна только по Еревану.</p>
        </div>

        <div className='included-visual relative flex items-center justify-center min-h-64 lg:min-h-0'>
          <img
            className='hidden lg:block full-image'
            src={Promo}
            alt='Открытая детская сказочная книжка с иллюстрациями'
            loading='lazy'
            decoding='async'
          />

          <div className='quote-panel absolute bottom-6 left-6 right-6 py-4 px-5 rounded-2xl text-center'>
            <span className='quote-text'>
              «Подарок, в котором взрослый ребёнок узнаёт себя — и чувствует
              себя особенным. Подарок, который оценят родители маленьких детей,
              потому что будет что вспомнить. Подарок, который оцените вы,
              особенно если не знаете, что еще подарить ребенку, у которого все
              есть.»
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
