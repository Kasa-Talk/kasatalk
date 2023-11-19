import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto text-center my-44">
      <div className="mb-6">
        <h1 className="text-5xl text-primary font-bold">404</h1>
      </div>
      <p className="mb-2">Maaf, Halaman tidak ditemukan</p>
      <div className='mt-5'>
        <a className="btn px-6 py-2" href={'/'}>
          Kembali Ke Beranda
        </a>
      </div>
    </div>
  );
}
