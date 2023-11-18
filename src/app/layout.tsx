import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import { AOSInit } from '@/utils/aos';
import Footer from '@/components/footer';

const poppins = Poppins({ weight: ['400', '600', '800'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kasa Talk',
  description: 'Kamus Bahasa Sasak',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <AOSInit />
      <body className={poppins.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
