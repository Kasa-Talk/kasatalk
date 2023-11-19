import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import { AOSInit } from '@/utils/aos';
import Footer from '@/components/footer';
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
      <AOSInit />
      <body className={poppins.className}>
        <Suspense fallback={<Loading />}>
          <Navbar />
          {children}
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
