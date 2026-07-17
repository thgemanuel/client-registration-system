import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
 
  const cadastro = (await import(`../i18n/cadastro/${locale}.json`)).default;
  const shared = (await import(`../i18n/shared/${locale}.json`)).default;

  return {
    locale,
    messages: {
      ...cadastro,
      ...shared
    }
  };
});
