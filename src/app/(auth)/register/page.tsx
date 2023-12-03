import Link from 'next/link';
import Image from 'next/image';

const Page = () => {
  return (
    <div className="block md:grid grid-cols-2 h-screen gap-6 ">
      <div className="bg-primary hidden md:flex justify-end">
        <Image src={'/asset/batik-icon-vertikal.svg'} width={100} height={100} alt="batik-image" />
      </div>
      <div className="my-auto px-4 mt-16 md:w-full max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl pb-3 font-bold leading-tight tracking-tight text-gray-900 dark:text-black">Buat Akun Anda</h1>
        <p className="text-base font-medium pb-12">Silahkan daftar untuk membuat akun</p>
        <form className="flex flex-col gap-4">
          <div>
            <label className="block mb-3 text-lg font-medium text-gray-900">Nama</label>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2 focus:outline-red-600 rounded-lg" placeholder="Nama Lengkap" />
          </div>
          <div>
            <label className="block mb-3 text-lg font-medium text-gray-900">Email</label>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2 focus:outline-red-600 rounded-lg" placeholder="jhonedoe@gmail.com" />
          </div>
          <div>
            <label className="block mb-3 text-lg font-medium text-gray-900">Password</label>
            <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2 focus:outline-red-600 rounded-lg" placeholder="password" />
          </div>
          <div>
            <label className="block mb-3 text-lg font-medium text-gray-900">Konfirmasi Password</label>
            <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2 focus:outline-red-600 rounded-lg" placeholder="confirm password" />
          </div>
          <button type="submit" className="w-full py-2 btn mt-6">
            Daftar
          </button>
        </form>
        <div className="pb-10">
          <p className="text-center text-lg font-semibold pt-7 text-black">
            Sudah punya akun?{' '}
            <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
