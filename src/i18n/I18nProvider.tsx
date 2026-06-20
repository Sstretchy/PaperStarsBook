import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { messages } from './messages';
import type { MessageCatalog } from './messages';
import type { Locale } from './types';

type I18nContextValue = {
  locale: Locale;
  messages: MessageCatalog;
  setLocale: (locale: Locale) => void;
};

const LOCALE_STORAGE_KEY = 'paper-stars-book-locale';

const I18nContext = createContext<I18nContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return value === 'ru' || value === 'hy';
}

export function I18nProvider({
  children,
  initialLocale = 'ru',
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === 'undefined') {
      return initialLocale;
    }

    const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(storedLocale) ? storedLocale : initialLocale;
  });

  useEffect(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      messages: messages[locale],
      setLocale,
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function useI18nContext() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18nContext must be used within I18nProvider');
  }

  return context;
}

export function useTranslations() {
  return useI18nContext().messages;
}

export function useLocale() {
  const { locale, setLocale } = useI18nContext();
  return { locale, setLocale };
}
