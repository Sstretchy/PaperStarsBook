import { useTranslations } from '../../i18n';

export function HowItWorksSection() {
  const t = useTranslations();

  return (
    <section className='landing-section landing-section-bg py-24 px-8'>
      <div className='max-w-[1200px] mx-auto'>
        <div className='text-center mb-16'>
          <p className='section-eyebrow'>{t.howItWorks.eyebrow}</p>
          <h2 className='section-title'>{t.howItWorks.title}</h2>
        </div>

        <div className='relative grid md:grid-cols-4 gap-8'>
          <div className='process-line absolute top-10 left-0 right-0 hidden md:block' />

          {t.howItWorks.steps.map((step) => (
            <div key={step.num} className='relative flex flex-col gap-5 z-10'>
              <div className='process-step-circle surface-card w-20 h-20 rounded-full flex items-center justify-center mx-auto md:mx-0'>
                <span className='process-step-num card-title'>{step.num}</span>
              </div>

              <div className='flex flex-col gap-2 text-center md:text-left'>
                <h3 className='card-title-md'>{step.title}</h3>
                <p className='section-copy-sm'>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
