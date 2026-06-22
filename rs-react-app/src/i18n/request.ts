import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as 'en' | 'ru')) {
    locale = routing.defaultLocale;
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;
  console.log('Loaded locale:', locale, 'Messages:', messages);

  return {
    locale: locale as 'en' | 'ru',
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
