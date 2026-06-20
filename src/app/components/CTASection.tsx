import { Send, Sparkles } from 'lucide-react';
import { useTranslations } from '../../i18n';

export function CTASection() {
  const t = useTranslations();

  return (
    <section className='cta-section py-24 px-8'>
      <div className='cta-panel max-w-[800px] mx-auto text-center rounded-3xl p-12 md:p-20 relative overflow-hidden'>
        <div className='cta-orb-top absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-30' />
        <div className='cta-orb-bottom absolute -bottom-12 -left-12 w-48 h-48 rounded-full opacity-25' />

        <div className='relative flex flex-col items-center gap-6'>
          <div className='cta-icon-wrap w-16 h-16 rounded-full flex items-center justify-center'>
            <Sparkles size={28} className='icon-primary' />
          </div>

          <h2 className='cta-title'>{t.cta.title}</h2>

          <p className='cta-copy'>{t.cta.copy}</p>

          <a
            href={t.links.telegram}
            target='_blank'
            rel='noopener noreferrer'
            className='landing-button landing-button-primary landing-button-pill landing-button-xl landing-button-cta'
          >
            <Send size={17} />
            {t.buttons.writeTelegram}
          </a>

          <p className='cta-note'>{t.cta.note}</p>
        </div>
      </div>
    </section>
  );
}
