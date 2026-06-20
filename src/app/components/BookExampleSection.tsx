import OneExample from '../../assets/2.webp';
import TwoExample from '../../assets/3.webp';
import ThreeExample from '../../assets/5.webp';
import FourExample from '../../assets/6.webp';
import FiveExample from '../../assets/9.webp';
import { useTranslations } from '../../i18n';

const pageImages = [OneExample, TwoExample, ThreeExample, FourExample, FiveExample];

export function BookExampleSection() {
  const t = useTranslations();

  return (
    <section className='landing-section landing-section-muted py-24 px-8'>
      <div className='max-w-[1440px] mx-auto'>
        <div className='text-center mb-16'>
          <p className='section-eyebrow'>{t.examples.eyebrow}</p>
          <h2 className='section-title'>{t.examples.title}</h2>
          <p className='section-copy mt-3'>{t.examples.copy}</p>
          <p className='section-copy mt-3'>{t.examples.copySecondary}</p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5'>
          {t.examples.pages.map((page, index) => (
            <div
              key={page.title}
              className='surface-card-soft flex flex-col rounded-3xl overflow-hidden transition-all duration-300 border-[rgba(196,164,120,0.2)]'
            >
              <img
                src={pageImages[index]}
                alt={t.examples.imageAlt}
                className='full-image'
                loading='lazy'
                decoding='async'
              />

              <div className='surface-card flex flex-col gap-3 p-5 flex-1'>
                <h4 className='card-title-sm'>{page.title}</h4>
                <p className='section-copy-xs'>{page.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
