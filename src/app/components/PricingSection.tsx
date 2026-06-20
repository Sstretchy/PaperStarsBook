import { useState } from 'react';
import {
  Send,
  Image,
  ExternalLink,
  ArrowRight,
  Minus,
  Plus,
  MapPin,
  FileText,
  ChevronRight,
} from 'lucide-react';
import freePreview from '../../assets/free.webp';
import paidPreviewOne from '../../assets/paid1.webp';
import paidPreviewTwo from '../../assets/paid2.webp';

const pageTypes = [
  {
    title: 'Страница с ребёнком без лица',
    price: '1 000 драм',
    text: 'Ребёнок показан со спины, сбоку, издалека или в ракурсе, где лицо почти не видно.',
    note: 'Атмосферные сцены, прогулки, детали сюжета.',
    highlight: false,
  },
  {
    title: 'Страница с узнаваемым лицом',
    price: '2 000 драм',
    text: 'Лицо видно в обычном ракурсе: стоит, сидит, смотрит прямо или немного в сторону.',
    note: 'Самый частый вариант для сказочных страниц.',
    highlight: true,
  },
  {
    title: 'Сложный ракурс',
    price: '4 000 драм',
    text: 'Ребёнок лежит, смотрит исподлобья, голова наклонена, необычный ракурс или сложная композиция.',
    note: 'Больше промтов, Photoshop и ручной работы.',
    highlight: false,
  },
  {
    title: 'Обложка',
    price: '4 000 драм',
    text: 'Считается как сложная страница — это главный визуал всей книжки.',
    note: '',
    highlight: false,
  },
];

function Stepper({
  value,
  onChange,
  min = 0,
  max = 30,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  const clamp = (next: number) => Math.min(max, Math.max(min, next));

  return (
    <div className='stepper-shell flex items-center gap-0'>
      <button
        onClick={() => onChange(clamp(value - 1))}
        disabled={value <= min}
        className='stepper-button'
      >
        <Minus size={14} />
      </button>
      <input
        type='number'
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(clamp(parseInt(e.target.value, 10) || 0))}
        className='stepper-input'
      />
      <button
        onClick={() => onChange(clamp(value + 1))}
        disabled={value >= max}
        className='stepper-button'
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

function ResultRow({
  label,
  value,
  bold = false,
  muted = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
  muted?: boolean;
}) {
  return (
    <div className='result-row flex items-baseline justify-between gap-2 py-2'>
      <span
        className={[
          'result-label',
          muted ? 'result-label-muted' : '',
          bold ? 'result-label-bold' : '',
        ].join(' ')}
      >
        {label}
      </span>
      <span
        className={[
          'result-value',
          bold ? 'result-value-bold' : '',
        ].join(' ')}
      >
        {value}
      </span>
    </div>
  );
}

function TextPagePreview({
  label,
  price,
  imageSrc,
  onClick,
  className
}: {
  label: string;
  price: string;
  imageSrc: string;
  className?: string;
  onClick: () => void;
}) {
  return (
    <div onClick={onClick} className='preview-card'>
      <div className='preview-image-wrap'>
        <img
          src={imageSrc}
          alt={label}
          className='cover-image'
          loading='lazy'
          decoding='async'
        />
        <div className='preview-hover-overlay'>
          <div className='preview-hover-icon'>
            <ExternalLink size={12} className='icon-primary' />
          </div>
        </div>
      </div>
      <div className='preview-caption'>
        <div className={`preview-title ${className}`}>{label}</div>
        <div className='preview-price'>{price}</div>
      </div>
    </div>
  );
}

function fmt(value: number) {
  return `${value.toLocaleString('ru-RU')} драм`;
}

export function PricingSection() {
  const calcId = 'pricing-calc';
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fancyBg, setFancyBg] = useState(false);
  const [simple, setSimple] = useState(0);
  const [standard, setStandard] = useState(0);
  const [complex, setComplex] = useState(0);

  const coverPrice = 4000;
  const totalIllPages = simple + standard + complex;
  const workPrice = coverPrice + simple * 1000 + standard * 2000 + complex * 4000;
  const bgPrice = fancyBg ? totalIllPages * 500 : 0;
  const creativeTotal = workPrice + bgPrice;
  const printEstimate = totalIllPages > 0 ? 400 + 300 * totalIllPages * 2 : 0;
  const totalWithPrint = creativeTotal + printEstimate;

  const CheckboxField = ({
    id,
    checked,
    onChange,
    label,
    hint,
  }: {
    id: string;
    checked: boolean;
    onChange: (value: boolean) => void;
    label: string;
    hint: string;
  }) => (
    <div className='flex flex-col gap-1'>
      <label
        htmlFor={id}
        className='pricing-checkbox-label flex items-start gap-3 cursor-pointer'
      >
        <div
          className={`pricing-checkbox-box ${checked ? 'pricing-checkbox-box-checked' : ''}`}
        >
          {checked && (
            <svg width='11' height='9' viewBox='0 0 11 9' fill='none'>
              <path
                d='M1 4l3 3 6-6'
                stroke='white'
                strokeWidth='1.8'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          )}
        </div>
        <input
          id={id}
          type='checkbox'
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className='pricing-checkbox-input'
        />
        <span className='pricing-field-label'>{label}</span>
      </label>
      <p className='pricing-field-hint pl-8'>{hint}</p>
    </div>
  );

  const StepperField = ({
    label,
    value,
    onChange,
    hint,
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    hint: string;
  }) => (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between gap-3 flex-wrap'>
        <span className='pricing-field-label'>{label}</span>
        <Stepper value={value} onChange={onChange} />
      </div>
      <p className='pricing-field-hint'>{hint}</p>
    </div>
  );

  return (
    <section className='pricing-section py-24 px-8' id='pricing'>
      {previewImage && (
        <div onClick={() => setPreviewImage(null)} className='preview-modal'>
          <button
            onClick={() => setPreviewImage(null)}
            className='preview-modal-close'
          >
            ×
          </button>
          <img
            src={previewImage}
            alt='Увеличенный пример'
            onClick={(e) => e.stopPropagation()}
            className='preview-modal-image'
          />
        </div>
      )}

      <div className='max-w-[1200px] mx-auto flex flex-col gap-16'>
        <div className='text-center flex flex-col gap-4'>
          <p className='section-eyebrow mb-0'>Стоимость</p>
          <h2 className='section-title'>Стоимость считается по страницам</h2>
          <p className='section-copy max-w-[580px] mx-auto'>
            Цена зависит от количества страниц, ракурса ребёнка, сложности сцены
            и необходимости печати. Перед началом я смотрю исходные фотографии и
            заранее объясняю, какие страницы простые, а какие потребуют больше
            ручной работы.
          </p>
          <a href={`#${calcId}`} className='pricing-link-inline mx-auto'>
            Перейти к калькулятору
            <ArrowRight size={13} />
          </a>
        </div>

        <div className='pricing-notice rounded-2xl p-6 flex gap-4 items-start'>
          <div className='icon-dot w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0'>
            <Image size={18} className='icon-primary' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <span className='pricing-notice-title'>Качество фото важно</span>
            <p className='pricing-notice-copy'>
              Чем лучше исходники, тем точнее получится образ ребёнка. Стоимость
              считается <strong className='text-[var(--foreground)]'>после просмотра фотографий</strong>:
              я оцениваю качество исходников, ракурс, видимость лица и
              сложность сцены. Если фото слишком низкого качества, я честно
              скажу об этом до начала работы.
            </p>
          </div>
        </div>

        <div>
          <h3 className='card-title mb-5'>Цена за страницу</h3>
          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5'>
            {pageTypes.map((item) => {
              const isHighlight = item.highlight;

              return (
                <div
                  key={item.title}
                  className={`pricing-page-card flex flex-col gap-4 p-6 rounded-2xl ${
                    isHighlight
                      ? 'pricing-page-card-highlight'
                      : 'pricing-page-card-default'
                  }`}
                >
                  <h4
                    className={`pricing-page-card-title ${
                      isHighlight
                        ? 'pricing-page-card-title-highlight'
                        : 'pricing-page-card-title-default'
                    }`}
                  >
                    {item.title}
                  </h4>
                  <span
                    className={`pricing-page-card-price ${
                      isHighlight
                        ? 'pricing-page-card-price-highlight'
                        : 'pricing-page-card-price-default'
                    }`}
                  >
                    {item.price}
                  </span>
                  <p
                    className={`pricing-page-card-copy ${
                      isHighlight
                        ? 'pricing-page-card-copy-highlight'
                        : 'pricing-page-card-copy-default'
                    }`}
                  >
                    {item.text}
                  </p>
                  {item.note && (
                    <p
                      className={`pricing-page-card-note pt-3 ${
                        isHighlight
                          ? 'pricing-page-card-note-highlight'
                          : 'pricing-page-card-note-default'
                      }`}
                    >
                      {item.note}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className='grid md:grid-cols-2 gap-6'>
          <div className='pricing-card p-7 rounded-2xl flex flex-col gap-5'>
            <h3 className='pricing-subtitle'>Страницы с текстом</h3>
            <ul className='flex flex-col gap-2'>
              {[
                'На нейтральном красивом фоне — бесплатно',
                'На сгенерированном фоне под сюжет — +500 драм за страницу',
              ].map((item) => (
                <li key={item} className='flex items-start gap-2.5'>
                  <div className='pricing-dot w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2' />
                  <span className='pricing-copy text-[var(--foreground)]'>{item}</span>
                </li>
              ))}
            </ul>

            <div className='flex gap-3 pt-1'>
              <TextPagePreview
                label='Нейтральный фон'
                className='break-all'
                price='бесплатно и одинаково везде'
                imageSrc={freePreview}
                onClick={() => setPreviewImage(freePreview)}
              />
              <TextPagePreview
                label='Фон под сюжет'
                price='+500 драм'
                imageSrc={paidPreviewOne}
                onClick={() => setPreviewImage(paidPreviewOne)}
              />
              <TextPagePreview
                label='Фон под сюжет'
                price='+500 драм'
                imageSrc={paidPreviewTwo}
                onClick={() => setPreviewImage(paidPreviewTwo)}
              />
            </div>
          </div>

          <a
            href='https://docs.google.com/forms/d/e/1FAIpQLSfhxM7uJvKVWMc6BltHvv8VBukt9tbipYSuEWJ8yM1HkbSoxQ/viewform'
            target='_blank'
            rel='noopener noreferrer'
            className='pricing-card pricing-story-card p-7 rounded-2xl flex flex-col gap-4 relative'
          >
            <div className='flex items-start justify-between gap-2'>
              <h3 className='pricing-subtitle'>Сюжет и текст</h3>
              <span className='pricing-story-link flex items-center gap-1 flex-shrink-0'>
                <FileText size={12} />
                Посмотреть опросник
              </span>
            </div>
            <p className='pricing-copy'>
              Можно выбрать готовый сюжет или заказать индивидуальную историю по
              опросу. Перед началом я присылаю вопросы о ребёнке: характер,
              любимые вещи, детали из жизни и пожелания к сюжету. На основе
              ответов и ваших фотографий я выстраиваю историю и сцены.
            </p>
            <p className='pricing-story-callout'>
              Текст не остаётся целиком: помимо создания сюжета я редактирую его
              вручную, чтобы сказка звучала живо, мягко и с душой.
            </p>
            <ChevronRight size={16} className='pricing-story-arrow' />
          </a>

          <div className='pricing-card p-7 rounded-2xl flex flex-col gap-4'>
            <h3 className='pricing-subtitle'>Печать в Ереване</h3>
            <p className='pricing-copy'>
              Файлы можно напечатать самостоятельно в любой типографии. Если вы
              в Ереване, я могу помочь с печатью и доставкой.
            </p>
            <ul className='flex flex-col gap-2'>
              {[
                'Печать оплачивается по ценам типографии',
                'Ориентир: A4 — около 300 драм за сторону',
                'Пружина для скрепления — около 400 драм',
                'Моя помощь с печатью и доставкой по Еревану — 3 000 драм + оплата курьера по факту',
              ].map((item) => (
                <li key={item} className='flex items-start gap-2.5'>
                  <div className='pricing-dot w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2' />
                  <span className='pricing-list-text'>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href='https://yandex.com/maps/-/CTAvvT7d'
              target='_blank'
              rel='noopener noreferrer'
              className='pricing-map-link flex items-start gap-3 rounded-xl p-4 group'
            >
              <div className='icon-tile flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center'>
                <MapPin size={16} className='icon-primary' />
              </div>
              <div className='flex flex-col gap-0.5 min-w-0'>
                <div className='flex items-center gap-1.5'>
                  <span className='pricing-map-title'>Printing House на карте</span>
                  <ExternalLink size={12} className='icon-primary opacity-70 flex-shrink-0' />
                </div>
                <p className='pricing-map-copy'>
                  Типография, где знают, как печатать такой формат, и откуда я
                  беру примерные цены.
                </p>
              </div>
            </a>

            <p className='pricing-field-hint border-t border-[var(--border)] pt-3'>
              Доставка доступна только по Еревану.
            </p>
          </div>

          <div className='pricing-card p-7 rounded-2xl flex flex-col gap-4'>
            <h3 className='pricing-subtitle'>Правки</h3>
            <p className='pricing-copy'>
              Чтобы результат был предсказуемым, сначала мы согласовываем текст,
              потом идею и сцены для страниц. После этого я начинаю работу над
              картинками.
            </p>
            <ul className='flex flex-col gap-3'>
              {[
                'Если вы согласовываете этапы по ходу работы, дополнительные правки после утверждения — 1 000 драм',
                'Если вам некогда участвовать в процессе и вы полностью доверяете мне, в конце включена одна большая бесплатная правка',
              ].map((item) => (
                <li key={item} className='flex items-start gap-2.5'>
                  <div className='pricing-dot w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2' />
                  <span className='pricing-list-text'>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div id={calcId} className='anchor-offset flex flex-col gap-6'>
          <div>
            <p className='section-eyebrow mb-2'>Калькулятор</p>
            <h3 className='section-title-sm mb-2'>Рассчитайте примерную стоимость</h3>
            <p className='section-copy-sm'>
              Укажите количество страниц разной сложности — калькулятор покажет
              ориентир по работе и примерную стоимость печати.
            </p>
          </div>

          <div className='pricing-calc-shell rounded-3xl overflow-hidden grid lg:grid-cols-2'>
            <div className='pricing-calc-left flex flex-col p-8 lg:p-10'>
              <h4 className='pricing-mini-heading mb-6'>Параметры книжки</h4>

              <div className='flex flex-col gap-6 flex-1'>
                <div className='flex items-start gap-3'>
                  <div className='pricing-cover-box'>
                    <svg width='11' height='9' viewBox='0 0 11 9' fill='none'>
                      <path
                        d='M1 4l3 3 6-6'
                        stroke='white'
                        strokeWidth='1.8'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                  <div className='flex flex-col gap-0.5'>
                    <label className='pricing-field-label'>Обложка</label>
                    <span className='pricing-field-hint'>
                      Входит всегда — 4 000 драм.
                    </span>
                  </div>
                </div>

                <CheckboxField
                  id='calc-bg'
                  checked={fancyBg}
                  onChange={setFancyBg}
                  label='Сгенерированные фоны для текстовых страниц'
                  hint='Нейтральный фон для текста — бесплатно. Фон под сюжет — +500 драм за каждую иллюстрированную страницу.'
                />

                <div className='pricing-divider' />

                <StepperField
                  label='Страниц, где ребёнок со спины или без лица'
                  value={simple}
                  onChange={setSimple}
                  hint='1 000 драм за страницу.'
                />
                <StepperField
                  label='Страниц, где лицо видно в обычном ракурсе'
                  value={standard}
                  onChange={setStandard}
                  hint='2 000 драм за страницу.'
                />
                <StepperField
                  label='Страниц со сложным ракурсом лица'
                  value={complex}
                  onChange={setComplex}
                  hint='4 000 драм за страницу — лежит, смотрит исподлобья, голова наклонена, сложная поза.'
                />
              </div>
            </div>

            <div className='pricing-calc-right flex flex-col p-8 lg:p-10'>
              <h4 className='pricing-mini-heading mb-5'>
                Рассчитанная примерная стоимость
              </h4>

              <div className='flex flex-col gap-0'>
                <ResultRow label='Обложка' value={fmt(coverPrice)} />
                <ResultRow
                  label={
                    simple > 0
                      ? `Простые страницы (${simple} × 1 000)`
                      : 'Простые страницы'
                  }
                  value={simple > 0 ? fmt(simple * 1000) : '—'}
                />
                <ResultRow
                  label={
                    standard > 0
                      ? `Стандартные страницы (${standard} × 2 000)`
                      : 'Стандартные страницы'
                  }
                  value={standard > 0 ? fmt(standard * 2000) : '—'}
                />
                <ResultRow
                  label={
                    complex > 0
                      ? `Сложные страницы (${complex} × 4 000)`
                      : 'Сложные страницы'
                  }
                  value={complex > 0 ? fmt(complex * 4000) : '—'}
                />
                <ResultRow
                  label={
                    bgPrice > 0
                      ? `Фоны для текста (${totalIllPages} × 500)`
                      : 'Фоны для текста'
                  }
                  value={bgPrice > 0 ? fmt(bgPrice) : '—'}
                />
                <ResultRow label='Итого за работу' value={fmt(creativeTotal)} bold />
              </div>

              <div className='pricing-spacer-md' />

              <p className='pricing-summary-note'>
                Печать считается отдельно по ценам типографии. Ориентир: 300
                драм за сторону A4 + 400 драм за пружину.
              </p>
              <div className='flex flex-col gap-0'>
                <ResultRow
                  label={
                    totalIllPages > 0
                      ? `Примерная печать (${totalIllPages} стр. × 2 стороны × 300)`
                      : 'Примерная печать'
                  }
                  value={totalIllPages > 0 ? fmt(300 * totalIllPages * 2) : '—'}
                  muted
                />
                <ResultRow
                  label='Пружина'
                  value={totalIllPages > 0 ? '400 драм' : '—'}
                  muted
                />
                <ResultRow
                  label='Итого с печатью (ориентир)'
                  value={totalIllPages > 0 ? fmt(totalWithPrint) : '—'}
                  bold
                />
              </div>

              <div className='mt-auto pt-6'>
                <div className='pricing-payment-box p-4 rounded-xl flex flex-col gap-4'>
                  <p>
                    <b>Как проходит оплата:</b>
                  </p>
                  <p>
                    После просмотра фото и согласования формата вносится
                    предоплата 50%. Остаток оплачивается перед передачей
                    финальных файлов без водяного знака или перед печатью.
                  </p>
                  <p className='pricing-field-hint'>
                    Это предварительный расчёт. Точная стоимость зависит от
                    качества исходных фото и сложности конкретных сцен. Если
                    фото маленькие, размытые или плохого качества, я могу не
                    взять их в работу, потому что не смогу отвечать за похожесть
                    и аккуратный результат.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-center'>
          <a
            href='https://t.me/Stretchy97'
            target='_blank'
            rel='noopener noreferrer'
            className='landing-button landing-button-primary landing-button-pill landing-button-xl landing-button-order'
          >
            Заказать книгу
            <Send size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
