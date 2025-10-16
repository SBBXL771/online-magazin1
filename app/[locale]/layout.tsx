import type { Metadata } from 'next';
import '../globals.css';
import TopHeader from '@/components/Layout/TopHeader';
import Header from '@/components/Layout/Header';
import 'swiper/css';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import Provider from '@/components/Provider';

export const metadata: Metadata = {
  title: 'Texnoshop',
  description: 'Arzon va sifatli texnikalar',
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <Provider>
          <NextIntlClientProvider>
            <header className="container">
              <TopHeader />
              <Header />
            </header>
            <main className="container">{children}</main>
          </NextIntlClientProvider>
        </Provider>
      </body>
    </html>
  );
}
