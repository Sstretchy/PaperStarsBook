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
import { useTranslations } from '../../i18n';

const previewImages = [freePreview, paidPreviewOne, paidPreviewTwo];

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
        className={['result-value', bold ? 'result-value-bold' : ''].join(' ')}
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
  className,
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
        <div className={`preview-title ${className ?? ''}`}>{label}</div>
        <div className='preview-price'>{price}</div>
      </div>
    </div>
  );
}

function fmt(value: number) {
  return `${value.toLocaleString('ru-RU')} драм`;
}

export function PricingSection() {
  const t = useTranslations();
  const calcId = t.pricing.calculator.id;
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fancyBg, setFancyBg] = useState(false);
  const [simple, setSimple] = useState(0);
  const [standard, setStandard] = useState(0);
  const [complex, setComplex] = useState(0);

  const coverPrice = 4000;
  const totalIllPages = simple + standard + complex;
  const workPrice =
    coverPrice + simple * 1000 + standard * 2000 + complex * 4000;
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
            x
          </button>
          <img
            src={previewImage}
            alt={t.pricing.textPages.previews[0].modalAlt}
            onClick={(e) => e.stopPropagation()}
            className='preview-modal-image'
          />
        </div>
      )}

      <div className='max-w-[1200px] mx-auto flex flex-col gap-16'>
        <div className='text-center flex flex-col gap-4'>
          <p className='section-eyebrow mb-0'>{t.pricing.eyebrow}</p>
          <h2 className='section-title'>{t.pricing.title}</h2>
          <p className='section-copy max-w-[580px] mx-auto'>{t.pricing.copy}</p>
          <a href={`#${calcId}`} className='pricing-link-inline mx-auto'>
            {t.buttons.goToCalculator}
            <ArrowRight size={13} />
          </a>
        </div>

        <div className='pricing-notice rounded-2xl p-6 flex gap-4 items-start'>
          <div className='icon-dot w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0'>
            <Image size={18} className='icon-primary' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <span className='pricing-notice-title'>
              {t.pricing.photoNoticeTitle}
            </span>
            <p className='pricing-notice-copy'>{t.pricing.photoNoticeCopy}</p>
          </div>
        </div>

        <div>
          <h3 className='card-title mb-5'>{t.pricing.pagePriceTitle}</h3>
          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5'>
            {t.pricing.pageTypes.map((item) => {
              const isHighlight =
                item.title === t.pricing.pageTypes[1].title;

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
            <h3 className='pricing-subtitle'>{t.pricing.textPages.title}</h3>
            <ul className='flex flex-col gap-2'>
              {t.pricing.textPages.bullets.map((item) => (
                <li key={item} className='flex items-start gap-2.5'>
                  <div className='pricing-dot w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2' />
                  <span className='pricing-copy text-[var(--foreground)]'>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className='flex gap-3 pt-1'>
              {t.pricing.textPages.previews.map((preview, index) => (
                <TextPagePreview
                  key={`${preview.label}-${index}`}
                  label={preview.label}
                  className={index === 0 ? 'break-all' : undefined}
                  price={preview.price}
                  imageSrc={previewImages[index]}
                  onClick={() => setPreviewImage(previewImages[index])}
                />
              ))}
            </div>
          </div>

          <a
            href={t.links.form}
            target='_blank'
            rel='noopener noreferrer'
            className='pricing-card pricing-story-card p-7 rounded-2xl flex flex-col gap-4 relative'
          >
            <div className='flex items-start justify-between gap-2'>
              <h3 className='pricing-subtitle'>{t.pricing.story.title}</h3>
              <span className='pricing-story-link flex items-center gap-1 flex-shrink-0'>
                <FileText size={12} />
                {t.pricing.story.linkLabel}
              </span>
            </div>
            <p className='pricing-copy'>{t.pricing.story.copy}</p>
            <p className='pricing-story-callout'>{t.pricing.story.callout}</p>
            <ChevronRight size={16} className='pricing-story-arrow' />
          </a>

          <div className='pricing-card p-7 rounded-2xl flex flex-col gap-4'>
            <h3 className='pricing-subtitle'>{t.pricing.printing.title}</h3>
            <p className='pricing-copy'>{t.pricing.printing.copy}</p>
            <ul className='flex flex-col gap-2'>
              {t.pricing.printing.bullets.map((item) => (
                <li key={item} className='flex items-start gap-2.5'>
                  <div className='pricing-dot w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2' />
                  <span className='pricing-list-text'>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href={t.links.map}
              target='_blank'
              rel='noopener noreferrer'
              className='pricing-map-link flex items-start gap-3 rounded-xl p-4 group'
            >
              <div className='icon-tile flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center'>
                <MapPin size={16} className='icon-primary' />
              </div>
              <div className='flex flex-col gap-0.5 min-w-0'>
                <div className='flex items-center gap-1.5'>
                  <span className='pricing-map-title'>
                    {t.pricing.printing.mapTitle}
                  </span>
                  <ExternalLink
                    size={12}
                    className='icon-primary opacity-70 flex-shrink-0'
                  />
                </div>
                <p className='pricing-map-copy'>{t.pricing.printing.mapCopy}</p>
              </div>
            </a>

            <p className='pricing-field-hint border-t border-[var(--border)] pt-3'>
              {t.pricing.printing.deliveryNote}
            </p>
          </div>

          <div className='pricing-card p-7 rounded-2xl flex flex-col gap-4'>
            <h3 className='pricing-subtitle'>{t.pricing.revisions.title}</h3>
            <p className='pricing-copy'>{t.pricing.revisions.copy}</p>
            <ul className='flex flex-col gap-3'>
              {t.pricing.revisions.bullets.map((item) => (
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
            <p className='section-eyebrow mb-2'>{t.pricing.calculator.eyebrow}</p>
            <h3 className='section-title-sm mb-2'>
              {t.pricing.calculator.title}
            </h3>
            <p className='section-copy-sm'>{t.pricing.calculator.copy}</p>
          </div>

          <div className='pricing-calc-shell rounded-3xl overflow-hidden grid lg:grid-cols-2'>
            <div className='pricing-calc-left flex flex-col p-8 lg:p-10'>
              <h4 className='pricing-mini-heading mb-6'>
                {t.pricing.calculator.paramsTitle}
              </h4>

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
                    <label className='pricing-field-label'>
                      {t.pricing.calculator.coverLabel}
                    </label>
                    <span className='pricing-field-hint'>
                      {t.pricing.calculator.coverHint}
                    </span>
                  </div>
                </div>

                <CheckboxField
                  id='calc-bg'
                  checked={fancyBg}
                  onChange={setFancyBg}
                  label={t.pricing.calculator.generatedBgLabel}
                  hint={t.pricing.calculator.generatedBgHint}
                />

                <div className='pricing-divider' />

                <StepperField
                  label={t.pricing.calculator.simpleLabel}
                  value={simple}
                  onChange={setSimple}
                  hint={t.pricing.calculator.simpleHint}
                />
                <StepperField
                  label={t.pricing.calculator.standardLabel}
                  value={standard}
                  onChange={setStandard}
                  hint={t.pricing.calculator.standardHint}
                />
                <StepperField
                  label={t.pricing.calculator.complexLabel}
                  value={complex}
                  onChange={setComplex}
                  hint={t.pricing.calculator.complexHint}
                />
              </div>
            </div>

            <div className='pricing-calc-right flex flex-col p-8 lg:p-10'>
              <h4 className='pricing-mini-heading mb-5'>
                {t.pricing.calculator.resultTitle}
              </h4>

              <div className='flex flex-col gap-0'>
                <ResultRow
                  label={t.pricing.calculator.coverRow}
                  value={fmt(coverPrice)}
                />
                <ResultRow
                  label={
                    simple > 0
                      ? `${t.pricing.calculator.simpleRow} (${simple} x 1 000)`
                      : t.pricing.calculator.simpleRow
                  }
                  value={simple > 0 ? fmt(simple * 1000) : '-'}
                />
                <ResultRow
                  label={
                    standard > 0
                      ? `${t.pricing.calculator.standardRow} (${standard} x 2 000)`
                      : t.pricing.calculator.standardRow
                  }
                  value={standard > 0 ? fmt(standard * 2000) : '-'}
                />
                <ResultRow
                  label={
                    complex > 0
                      ? `${t.pricing.calculator.complexRow} (${complex} x 4 000)`
                      : t.pricing.calculator.complexRow
                  }
                  value={complex > 0 ? fmt(complex * 4000) : '-'}
                />
                <ResultRow
                  label={
                    bgPrice > 0
                      ? `${t.pricing.calculator.textBgRow} (${totalIllPages} x 500)`
                      : t.pricing.calculator.textBgRow
                  }
                  value={bgPrice > 0 ? fmt(bgPrice) : '-'}
                />
                <ResultRow
                  label={t.pricing.calculator.workTotalRow}
                  value={fmt(creativeTotal)}
                  bold
                />
              </div>

              <div className='pricing-spacer-md' />

              <p className='pricing-summary-note'>
                {t.pricing.calculator.printNote}
              </p>
              <div className='flex flex-col gap-0'>
                <ResultRow
                  label={
                    totalIllPages > 0
                      ? `${t.pricing.calculator.printRow} (${totalIllPages} стр. x 2 стороны x 300)`
                      : t.pricing.calculator.printRow
                  }
                  value={totalIllPages > 0 ? fmt(300 * totalIllPages * 2) : '-'}
                  muted
                />
                <ResultRow
                  label={t.pricing.calculator.spiralRow}
                  value={totalIllPages > 0 ? '400 драм' : '-'}
                  muted
                />
                <ResultRow
                  label={t.pricing.calculator.grandTotalRow}
                  value={totalIllPages > 0 ? fmt(totalWithPrint) : '-'}
                  bold
                />
              </div>

              <div className='mt-auto pt-6'>
                <div className='pricing-payment-box p-4 rounded-xl flex flex-col gap-4'>
                  <p>
                    <b>{t.pricing.calculator.paymentTitle}</b>
                  </p>
                  <p>{t.pricing.calculator.paymentCopy}</p>
                  <p className='pricing-field-hint'>
                    {t.pricing.calculator.paymentHint}
                  </p>
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
