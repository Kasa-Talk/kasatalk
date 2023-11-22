import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { AOSInit } from '@/utils/aos';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <AOSInit />
      <Navbar />
      {children}
      <Footer />
    </section>
  );
}
