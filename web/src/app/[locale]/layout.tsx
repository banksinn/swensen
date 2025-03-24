import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.scss';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title:
    'สั่งไอศกรีมออนไลน์จากบริการส่งอาหารที่ดีที่สุด จากร้านสเวนเซ่นส์ใกล้บ้านคุณ | Swensen’s',
  description:
    'สั่งเลย! พร้อมส่งไอศกรีมถึงที่! ผ่าน https://www.swensens1112.com ดาวน์โหลดแอปฯ หรือโทรสั่ง 1112 ถึงบ้านทันที',
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    redirect('/th');
  }
  return (
    <html>
      <body className={inter.variable} lang={locale}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
