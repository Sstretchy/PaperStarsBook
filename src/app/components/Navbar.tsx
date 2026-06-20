import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../../assets/logo.webp';
import { useLocale, useTranslations } from '../../i18n';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations();
  const { locale, setLocale } = useLocale();
  const handleLocaleChange = (nextLocale: 'ru' | 'hy') => {
    setLocale(nextLocale);
    setMobileOpen(false);
  };
  const getLocaleLabel = (item: 'ru' | 'hy') =>
    item === 'ru' ? 'RU' : 'AM';

  return (
    <nav
      className='landing-navbar fixed top-0 left-0 right-0 z-50 px-8 py-4'
    >
      <div className='max-w-[1440px] mx-auto flex items-center justify-between'>
        <div className='flex items-center gap-2.5'>
          <img
            src={Logo}
            alt={t.brand.logoAlt}
            className='landing-logo'
            width='40'
            height='40'
            decoding='async'
          />
          <span className='landing-brand'>{t.brand.name}</span>
        </div>

        <div className='hidden md:flex items-center gap-8'>
          {t.nav.links.map((l) => (
            <a key={l.href} href={l.href} className='landing-nav-link'>
              {l.label}
            </a>
          ))}
        </div>

        <div className='hidden md:flex items-center gap-3'>
          <div className='flex items-center rounded-full border border-[var(--border)] bg-[rgba(255,251,246,0.82)] p-1 backdrop-blur-sm'>
            {(['ru', 'hy'] as const).map((item) => {
              const active = locale === item;
              const label = getLocaleLabel(item);

              return (
                <button
                  key={item}
                  type='button'
                  onClick={() => handleLocaleChange(item)}
                  aria-pressed={active}
                  className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${
                    active
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                      : 'text-[var(--muted-foreground)]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <a
            href={t.links.telegram}
            target='_blank'
            rel='noopener noreferrer'
            className='landing-button landing-button-primary landing-button-pill landing-button-sm'
          >
            {t.buttons.orderBook}
          </a>
        </div>

        <div className='flex items-center gap-2 md:hidden'>
          <div className='flex items-center rounded-full border border-[var(--border)] bg-[rgba(255,251,246,0.82)] p-1'>
            {(['ru', 'hy'] as const).map((item) => {
              const active = locale === item;
              const label = getLocaleLabel(item);

              return (
                <button
                  key={item}
                  type='button'
                  onClick={() => handleLocaleChange(item)}
                  aria-pressed={active}
                  className={`rounded-full px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                    active
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                      : 'text-[var(--muted-foreground)]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <button
            className='landing-mobile-toggle md:hidden'
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className='landing-mobile-menu md:hidden mt-4 pb-4 flex flex-col gap-4'>
          {t.nav.links.map((l) => (
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
            href={t.links.telegram}
            target='_blank'
            rel='noopener noreferrer'
            onClick={() => setMobileOpen(false)}
            className='landing-button landing-button-primary landing-button-pill landing-button-md w-full sm:w-fit'
          >
            {t.buttons.orderBook}
          </a>
        </div>
      )}
    </nav>
  );
}
