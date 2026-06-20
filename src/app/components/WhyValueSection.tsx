import BookImage from '../../assets/hero2.webp';
import { useTranslations } from '../../i18n';

export function WhyValueSection() {
  const t = useTranslations();

  return (
    <section className='landing-section landing-section-bg py-24 px-8'>
      <div className='max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16 items-center'>
        <div className='relative order-last lg:order-first'>
          <div className='section-image-backdrop absolute -top-6 -left-6 w-full h-full rounded-3xl' />

          <div className='section-image-frame relative rounded-3xl overflow-hidden'>
            <img
              src={BookImage}
              alt={t.whyValue.imageAlt}
              className='full-image'
              loading='lazy'
              decoding='async'
            />
            <div className='image-overlay-soft absolute inset-0' />
          </div>

          <div className='floating-quote-card surface-card absolute -bottom-6 -right-6 p-5 rounded-2xl max-w-60'>
            <p className='quote-text'>«{t.whyValue.quote}»</p>
            <p className='quote-attribution'>- {t.whyValue.quoteAuthor}</p>
          </div>
        </div>

        <div className='flex flex-col gap-8'>
          <div>
            <p className='section-eyebrow'>{t.whyValue.eyebrow}</p>
            <h2 className='section-title'>{t.whyValue.title}</h2>
          </div>

          <p className='value-emphasis'>«{t.whyValue.emphasis}».</p>

          <p className='section-copy-sm'>{t.whyValue.copy}</p>

          <div className='flex flex-col gap-5'>
            {t.whyValue.points.map((item) => (
              <div key={item.label} className='flex flex-col gap-1.5'>
                <span className='value-point-label'>{item.label}</span>
                <p className='section-copy-sm'>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
