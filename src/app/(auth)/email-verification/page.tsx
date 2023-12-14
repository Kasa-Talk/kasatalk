import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-3xl mx-auto my-auto flex flex-col gap-5 items-center border rounded-md bg-white p-6">
        <div>
          <Image src={'/logo.svg'} width={100} height={100} alt="Logo Kasa Talk" />
        </div>
        <div className="text-center mt-2">
          <h1 className="font-bold text-2xl">Terima Kasih Sudah Mendaftar</h1>
          <p className="mt-3">Silahkan periksa email anda untuk aktivasi akun anda</p>
        </div>
        <Link href={'/login'}>
          <button className="btn px-10 py-2">Login</button>
        </Link>
      </div>
    </div>
  );
}
