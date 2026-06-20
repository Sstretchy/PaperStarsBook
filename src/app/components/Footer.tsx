import { Heart } from 'lucide-react';
import Logo from '../../assets/logo.webp';
import { useTranslations } from '../../i18n';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className='footer-shell px-8 py-12'>
      <div className='max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6'>
        <div className='flex items-center gap-2.5'>
          <img
            src={Logo}
            alt={t.brand.logoAlt}
            className='landing-logo'
            width='40'
            height='40'
            loading='lazy'
            decoding='async'
          />
          <span className='footer-brand'>{t.brand.name}</span>
        </div>

        <p className='footer-copy'>{t.footer.location}</p>

        <p className='footer-meta flex items-center gap-1.5'>
          {t.footer.madeWith}
          <Heart size={12} className='footer-heart fill-current' />
          {t.footer.forChildren}
        </p>
      </div>
    </footer>
  );
}
