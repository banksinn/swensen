import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title:
    'สั่งไอศกรีมออนไลน์จากบริการส่งอาหารที่ดีที่สุด จากร้านสเวนเซ่นส์ใกล้บ้านคุณ | Swensen’s',
  description:
    'สั่งเลย! พร้อมส่งไอศกรีมถึงที่! ผ่าน https://www.swensens1112.com ดาวน์โหลดแอปฯ หรือโทรสั่ง 1112 ถึงบ้านทันที',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
