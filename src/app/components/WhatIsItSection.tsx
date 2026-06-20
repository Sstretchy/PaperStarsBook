import { User, Feather, BookOpen } from 'lucide-react';

const cards = [
  {
    icon: User,
    title: 'Ребёнок становится героем сказки',
    text: 'Я с особым перфекционизмом сохраняю узнаваемость, настроение, возраст и важные детали внешности, чтобы герой действительно был похож на себя.',
  },
  {
    icon: Feather,
    title: 'История создаётся индивидуально',
    text: 'Перед началом я присылаю небольшой опрос: можно добавить детали о ребёнке, его характере, любимых вещах и пожеланиях к сюжету. После этого я смотрю исходные фото, и из них выстраивается история.',
  },
  {
    icon: BookOpen,
    title: 'Готовые файлы или печать',
    text: 'Вы получаете исходные страницы и PDF для самостоятельной печати. Если вы в Ереване, я могу за дополнительную плату помочь с печатью и доставкой.',
  },
];

export function WhatIsItSection() {
  return (
    <section className='landing-section landing-section-bg py-24 px-8'>
      <div className='max-w-[1200px] mx-auto'>
        <div className='text-center mb-16'>
          <p className='section-eyebrow'>Что это такое</p>
          <h2 className='section-title'>
            Книжка, которую нельзя купить в магазине
          </h2>
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
          {cards.map((card) => (
            <div
              key={card.title}
              className='surface-card-soft flex flex-col gap-5 p-8 rounded-3xl transition-all duration-300'
            >
              <div className='icon-tile w-14 h-14 rounded-2xl flex items-center justify-center'>
                <card.icon size={24} className='icon-primary' />
              </div>
              <h3 className='card-title'>{card.title}</h3>
              <p className='section-copy-sm'>{card.text}</p>
            </div>
          ))}
        </div>

        <div className='surface-note mt-10 mx-auto max-w-[720px] text-center py-5 px-8 rounded-2xl'>
          <p className='feature-text'>
            Такую книжку нельзя просто сгенерировать одним промтом: здесь важны вкус, внимание к лицу ребёнка и моя отдача делу. {' '}
            <span className='font-semibold'>
              У других людей может получиться красиво, но не узнаваемо, с чужим лицом. Я считаю, что это выглядит не мило, а тревожно, поэтому я горжусь своим подходом к работе.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
