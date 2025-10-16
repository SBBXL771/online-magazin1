import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['uz', 'ru'],
  localePrefix: 'as-needed',


  defaultLocale: 'uz'
});