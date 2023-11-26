import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Navbar />
      {children}
      <Footer />
    </section>
  );
}
