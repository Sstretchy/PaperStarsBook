import { Send, Sparkles } from 'lucide-react';

const TELEGRAM_LINK = 'https://t.me/Stretchy97';

export function CTASection() {
  return (
    <section className='cta-section py-24 px-8'>
      <div className='cta-panel max-w-[800px] mx-auto text-center rounded-3xl p-12 md:p-20 relative overflow-hidden'>
        <div className='cta-orb-top absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-30' />
        <div className='cta-orb-bottom absolute -bottom-12 -left-12 w-48 h-48 rounded-full opacity-25' />

        <div className='relative flex flex-col items-center gap-6'>
          <div className='cta-icon-wrap w-16 h-16 rounded-full flex items-center justify-center'>
            <Sparkles size={28} className='icon-primary' />
          </div>

          <h2 className='cta-title'>Хотите создать сказку про вашего ребёнка?</h2>

          <p className='cta-copy'>
            Напишите мне, и я помогу понять, какой сюжет и формат подойдут
            именно вам.
          </p>

          <a
            href={TELEGRAM_LINK}
            target='_blank'
            rel='noopener noreferrer'
            className='landing-button landing-button-primary landing-button-pill landing-button-xl landing-button-cta'
          >
            <Send size={17} />
            Написать в Telegram
          </a>

          <p className='cta-note'>
            Можно начать с консультации и показать фотографии,
            <br />
            чтобы я оценила, какой формат подойдёт лучше.
          </p>
        </div>
      </div>
    </section>
  );
}
