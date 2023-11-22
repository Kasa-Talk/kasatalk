import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import Loading from './loading';

const poppins = Poppins({ weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kasa Talk',
  description: 'Kamus Bahasa Sasak',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
