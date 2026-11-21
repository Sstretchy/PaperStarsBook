import { useState } from 'react';
import {
  Send,
  ExternalLink,
  ChevronDown,
  Minus,
  Plus,
  Check,
} from 'lucide-react';
import economyPreview from '../../assets/free.webp';
import standardPreview from '../../assets/books/tata/07.webp';
import { useTranslations } from '../../i18n';
import {
  TIERS,
  MIN_SHEETS,
  MAX_SHEETS,
  PRINT_PER_SHEET,
  workPrice,
  printPrice,
  formatAmount,
  withDeposit,
  type TierId,
} from '../pricing';

function Stepper({
  value,
  onChange,
  min,
  max,
}: {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}) {
  const clamp = (next: number) => Math.min(max, Math.max(min, next));

  return (
    <div className='stepper-shell flex items-center gap-0'>
      <button
        type='button'
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
        onChange={(e) => onChange(clamp(parseInt(e.target.value, 10) || min))}
        className='stepper-input'
      />
      <button
        type='button'
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
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className='result-row flex items-baseline justify-between gap-2 py-2'>
      <span className={`result-label ${bold ? 'result-label-bold' : ''}`}>
        {label}
      </span>
      <span className={`result-value ${bold ? 'result-value-bold' : ''}`}>
        {value}
      </span>
    </div>
  );
}

function PagePreview({
  label,
  imageSrc,
  onClick,
}: {
  label: string;
  imageSrc: string;
  onClick: () => void;
}) {
  return (
    <button type='button' onClick={onClick} className='preview-card text-left'>
      <div className='preview-image-wrap preview-image-wrap-tall'>
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
        <div className='preview-title'>{label}</div>
      </div>
    </button>
  );
}

export function PricingSection() {
  const t = useTranslations();
  const p = t.pricing;
  const c = p.calculator;
  const money = (value: number) => `${formatAmount(value)} ${p.currency}`;

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [tierId, setTierId] = useState<TierId>('standard');
  const [sheets, setSheets] = useState(10);
  const [withPrint, setWithPrint] = useState(false);

  const tier = TIERS.find((item) => item.id === tierId) ?? TIERS[0];
  const tierText = p.tiers.find((item) => item.id === tierId) ?? p.tiers[0];
  const work = workPrice(tierId, sheets);
  const print = withPrint ? printPrice(sheets) : 0;

  return (
    <section className='pricing-section py-24 px-8' id='pricing'>
      {previewImage && (
        <div onClick={() => setPreviewImage(null)} className='preview-modal'>
          <button
            onClick={() => setPreviewImage(null)}
            className='preview-modal-close'
          >
            x
          </button>
          <img
            src={previewImage}
            alt={p.compare.modalAlt}
            onClick={(e) => e.stopPropagation()}
            className='preview-modal-image'
          />
        </div>
      )}

      <div className='max-w-[1200px] mx-auto flex flex-col gap-16'>
        <div className='text-center flex flex-col gap-4'>
          <p className='section-eyebrow mb-0'>{p.eyebrow}</p>
          <h2 className='section-title'>{p.title}</h2>
          <p className='section-copy max-w-[620px] mx-auto'>{p.copy}</p>
        </div>

        <div className='grid md:grid-cols-3 gap-5'>
          {TIERS.map((item) => {
            const text = p.tiers.find((x) => x.id === item.id) ?? p.tiers[0];
            const highlight = item.id === 'standard';
            const variant = highlight ? 'highlight' : 'default';

            return (
              <div
                key={item.id}
                className={`pricing-page-card pricing-page-card-${variant} flex flex-col gap-4 p-7 rounded-2xl`}
              >
                <h3
                  className={`pricing-page-card-title pricing-page-card-title-${variant}`}
                >
                  {text.name}
                </h3>

                <span
                  className={`pricing-page-card-price pricing-page-card-price-${variant}`}
                >
                  {p.fromLabel} {money(workPrice(item.id, MIN_SHEETS))}
                </span>

                <p
                  className={`pricing-page-card-copy pricing-page-card-copy-${variant}`}
                >
                  {text.text}
                </p>

                <div
                  className={`pricing-page-card-note pricing-page-card-note-${variant} pt-3 mt-auto flex flex-col gap-1`}
                >
                  <span>
                    {p.baseLabel}: {money(item.base)}
                  </span>
                  <span>
                    + {money(item.perSheet)} {p.perSheetLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <p className='section-copy-sm text-center -mt-10'>{p.minNote}</p>

        <div className='grid md:grid-cols-2 gap-6'>
          <div className='pricing-card p-7 rounded-2xl flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
              <h3 className='pricing-subtitle'>{p.compare.title}</h3>
              <p className='pricing-copy'>{p.compare.copy}</p>
            </div>
            <div className='flex gap-3'>
              <PagePreview
                label={p.compare.economyLabel}
                imageSrc={economyPreview}
                onClick={() => setPreviewImage(economyPreview)}
              />
              <PagePreview
                label={p.compare.standardLabel}
                imageSrc={standardPreview}
                onClick={() => setPreviewImage(standardPreview)}
              />
            </div>
          </div>

          <div className='pricing-card p-7 rounded-2xl flex flex-col gap-4'>
            <h3 className='pricing-subtitle'>{p.included.title}</h3>
            <ul className='flex flex-col gap-3'>
              {p.included.items.map((item) => (
                <li key={item} className='flex items-start gap-2.5'>
                  <Check size={16} className='icon-primary flex-shrink-0 mt-1' />
                  <span className='pricing-list-text'>{item}</span>
                </li>
              ))}
            </ul>
            <details className='mt-auto group'>
              <summary className='pricing-link-inline cursor-pointer list-none flex items-center gap-1'>
                {p.included.questionsTitle}
                <ChevronDown
                  size={14}
                  className='transition-transform group-open:rotate-180'
                />
              </summary>
              <ol className='mt-4 flex flex-col gap-2 list-decimal pl-5'>
                {p.included.questions.map((question) => (
                  <li key={question} className='pricing-list-text'>
                    {question}
                  </li>
                ))}
              </ol>
            </details>
          </div>
        </div>

        <div id={c.id} className='anchor-offset flex flex-col gap-6'>
          <div>
            <p className='section-eyebrow mb-2'>{c.eyebrow}</p>
            <h3 className='section-title-sm'>{c.title}</h3>
          </div>

          <div className='pricing-calc-shell rounded-3xl overflow-hidden grid lg:grid-cols-2'>
            <div className='pricing-calc-left flex flex-col gap-7 p-8 lg:p-10'>
              <div className='flex flex-col gap-3'>
                <span className='pricing-field-label'>{c.tierLabel}</span>
                <div className='flex flex-wrap gap-2'>
                  {TIERS.map((item) => {
                    const name =
                      p.tiers.find((x) => x.id === item.id)?.name ?? item.id;
                    const active = item.id === tierId;

                    return (
                      <button
                        key={item.id}
                        type='button'
                        onClick={() => setTierId(item.id)}
                        aria-pressed={active}
                        className={`cursor-pointer rounded-full border px-5 py-2.5 text-base font-semibold transition-colors ${
                          active
                            ? 'border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]'
                            : 'border-[var(--border)] bg-[rgba(255,251,246,0.82)] text-[var(--foreground)]'
                        }`}
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
                <p className='pricing-field-hint'>{tierText.text}</p>
              </div>

              <div className='pricing-divider' />

              <div className='flex flex-col gap-2'>
                <div className='flex items-center justify-between gap-3 flex-wrap'>
                  <span className='pricing-field-label'>{c.sheetsLabel}</span>
                  <Stepper
                    value={sheets}
                    onChange={setSheets}
                    min={MIN_SHEETS}
                    max={MAX_SHEETS}
                  />
                </div>
                <p className='pricing-field-hint'>{c.sheetsHint}</p>
              </div>

              <div className='flex flex-col gap-1'>
                <label
                  htmlFor='calc-print'
                  className='pricing-checkbox-label flex items-start gap-3 cursor-pointer'
                >
                  <div
                    className={`pricing-checkbox-box ${withPrint ? 'pricing-checkbox-box-checked' : ''}`}
                  >
                    {withPrint && (
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
                    id='calc-print'
                    type='checkbox'
                    checked={withPrint}
                    onChange={(e) => setWithPrint(e.target.checked)}
                    className='pricing-checkbox-input'
                  />
                  <span className='pricing-field-label'>{c.printLabel}</span>
                </label>
                <p className='pricing-field-hint pl-8'>{c.printHint}</p>
              </div>
            </div>

            <div className='pricing-calc-right flex flex-col p-8 lg:p-10'>
              <h4 className='pricing-mini-heading mb-5'>{c.resultTitle}</h4>

              <div className='flex flex-col gap-0'>
                <ResultRow label={c.baseRow} value={money(tier.base)} />
                <ResultRow
                  label={`${c.sheetsRow} (${sheets} × ${formatAmount(tier.perSheet)})`}
                  value={money(sheets * tier.perSheet)}
                />
                {withPrint && (
                  <ResultRow
                    label={`${c.printRow} (${sheets} × ${formatAmount(PRINT_PER_SHEET)})`}
                    value={money(print)}
                  />
                )}
                <ResultRow label={c.totalRow} value={money(work + print)} bold />
              </div>

              <div className='mt-auto pt-6'>
                <div className='pricing-payment-box p-4 rounded-xl flex flex-col gap-3'>
                  <p>
                    <b>{c.paymentTitle}</b>
                  </p>
                  <p>{withDeposit(c.paymentCopy, p.currency)}</p>
                  <p className='pricing-field-hint'>{c.paymentHint}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-center'>
          <a
            href={t.links.telegram}
            target='_blank'
            rel='noopener noreferrer'
            className='landing-button landing-button-primary landing-button-pill landing-button-xl landing-button-order'
          >
            {t.buttons.orderBook}
            <Send size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
