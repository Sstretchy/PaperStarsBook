import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../../assets/logo.webp';

const TELEGRAM_LINK = 'https://t.me/Stretchy97';

const links = [
  { label: 'Что это', href: '#what' },
  { label: 'Пример', href: '#example' },
  { label: 'Как работает', href: '#how' },
  { label: 'Стоимость', href: '#pricing' },
  { label: 'Калькулятор стоимости', href: '#pricing-calc' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className='landing-navbar fixed top-0 left-0 right-0 z-50 px-8 py-4'
    >
      <div className='max-w-[1440px] mx-auto flex items-center justify-between'>
        <div className='flex items-center gap-2.5'>
          <img
            src={Logo}
            alt='Логотип'
            className='landing-logo'
            width='40'
            height='40'
            decoding='async'
          />
          <span className='landing-brand'>Paper stars book</span>
        </div>

        <div className='hidden md:flex items-center gap-8'>
          {links.map((l) => (
            <a key={l.href} href={l.href} className='landing-nav-link'>
              {l.label}
            </a>
          ))}
        </div>

        <div className='hidden md:block'>
          <a
            href={TELEGRAM_LINK}
            target='_blank'
            rel='noopener noreferrer'
            className='landing-button landing-button-primary landing-button-pill landing-button-sm'
          >
            Заказать книгу
          </a>
        </div>

        <button
          className='landing-mobile-toggle md:hidden'
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className='landing-mobile-menu md:hidden mt-4 pb-4 flex flex-col gap-4'>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className='landing-mobile-link'
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href={TELEGRAM_LINK}
            target='_blank'
            rel='noopener noreferrer'
            onClick={() => setMobileOpen(false)}
            className='landing-button landing-button-primary landing-button-pill landing-button-md w-fit'
          >
            Заказать книгу
          </a>
        </div>
      )}
    </nav>
  );
}
