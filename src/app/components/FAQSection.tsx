import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'Можно заказать книжку на армянском языке?',
    a: 'Да. Я живу в Армении, но для текста на армянском потребуется ваше участие в финальной проверке перед печатью.',
  },
  {
    q: 'Сколько фотографий нужно?',
    a: 'Лучше прислать как можно больше чётких фото лица, эмоций. Чем качественнее исходники, тем лучше получится результат. Чем их большеЮ тем больше у меня идей будет, как их оригинально обыграть в сюжете.',
  },
  {
    q: 'Подойдут ли любые фотографии?',
    a: 'Нет. Для хорошего результата нужны достаточно чёткие фотографии нормального качества. Если фото слишком маленькие, размытые или плохо видно лицо, я могу отказаться от работы с ними.',
  },
  {
    q: 'Можно ли заказать не из Армении?',
    a: 'Да. Я могу сделать цифровую версию для любой страны: вы получите файлы и сможете напечатать их самостоятельно.',
  },
  {
    q: 'Можно ли добавить реальные детали из жизни ребёнка?',
    a: 'Конечно. В опросе перед началом работы я спрашиваю про характер, любимые вещи, интересы и важные детали — всё это отражается в сюжете и деталях иллюстраций.',
  },
  {
    q: 'Можно ли выбрать сюжет?',
    a: 'Да. Вы можете предложить тему или описать пожелания, а я предложу варианты. Финальный сюжет всегда согласовывается перед началом работы.',
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className='landing-section landing-section-muted py-24 px-8'>
      <div className='max-w-[800px] mx-auto'>
        <div className='text-center mb-16'>
          <p className='section-eyebrow'>Частые вопросы</p>
          <h2 className='section-title'>Вопросы и ответы</h2>
        </div>

        <div className='flex flex-col gap-3'>
          {faqs.map((faq, i) => {
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
