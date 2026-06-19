import { Heart } from 'lucide-react';
import Logo from '../../assets/logo.webp';

export function Footer() {
  return (
    <footer className='footer-shell px-8 py-12'>
      <div className='max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6'>
        <div className='flex items-center gap-2.5'>
          <img
            src={Logo}
            alt='Логотип'
            className='landing-logo'
            width='40'
            height='40'
            loading='lazy'
            decoding='async'
          />
          <span className='footer-brand'>Paper stars book</span>
        </div>

        <p className='footer-copy'>
          Персональные детские фотокниги · Ереван, Армения · +374 91 183 349
        </p>

        <p className='footer-meta flex items-center gap-1.5'>
          Сделано с
          <Heart size={12} className='footer-heart fill-current' />
          для ваших детей
        </p>
      </div>
    </footer>
  );
}
