import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.scss';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Link from 'next/link';
import Image from 'next/image';

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
        <header className="sticky top-0 z-20 hidden h-[80px] w-full gap-8 bg-background-white px-16 [box-shadow:0_2px_15px_rgba(0,0,0,.05)] lg:flex">
          <section className="relative mx-auto w-full p-12 max-w-screen-2xl">
            <div className="flex w-full items-center justify-center">
              <div className="!my-0 !ml-0 !mr-24 flex h-full shrink-0 items-center bg-none">
                <Link href="/th">
                  <Image
                    width={152}
                    height={40}
                    src="https://www.swensens1112.com/images/desktop-header-logo.svg"
                    alt="swensen-logo"
                  />
                </Link>
              </div>
              <div className="header-right inline-flex w-full shrink items-center justify-end space-x-16">
                test
              </div>
            </div>
          </section>
        </header>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
