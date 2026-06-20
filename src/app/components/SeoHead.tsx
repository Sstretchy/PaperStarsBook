import { useEffect } from 'react';
import { useTranslations } from '../../i18n';

function setMetaByName(name: string, content: string) {
  const element = document.head.querySelector(
    `meta[name="${name}"]`
  ) as HTMLMetaElement | null;

  if (element) {
    element.content = content;
  }
}

function setMetaByProperty(property: string, content: string) {
  const element = document.head.querySelector(
    `meta[property="${property}"]`
  ) as HTMLMetaElement | null;

  if (element) {
    element.content = content;
  }
}

export function SeoHead() {
  const meta = useTranslations().meta;

  useEffect(() => {
    document.documentElement.lang = meta.htmlLang;
    document.title = meta.title;

    setMetaByName('description', meta.description);
    setMetaByName('robots', meta.robots);
    setMetaByName('theme-color', meta.themeColor);
    setMetaByName('twitter:card', meta.twitterCard);
    setMetaByName('twitter:title', meta.twitterTitle);
    setMetaByName('twitter:description', meta.twitterDescription);

    setMetaByProperty('og:type', meta.ogType);
    setMetaByProperty('og:locale', meta.ogLocale);
    setMetaByProperty('og:site_name', meta.siteName);
    setMetaByProperty('og:title', meta.ogTitle);
    setMetaByProperty('og:description', meta.ogDescription);
    setMetaByProperty('og:image:alt', meta.ogImageAlt);
  }, [meta]);

  return null;
}
