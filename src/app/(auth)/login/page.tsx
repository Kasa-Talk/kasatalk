import Link from "next/link";
import Image from "next/image";

const Page = () => {
  return (
    <div className="grid md:grid-cols-2 h-screen">
      <div className="bg-primary hidden md:flex justify-end">
        <Image
          src={"/asset/batik-icon-vertikal.svg"}
          width={100}
          height={100}
          alt="batik-image"
        />
      </div>
      <div className="flex items-center justify-center">
        <div className="max-w-2xl px-4 w-full">
          <h1 className="md:text-4xl text-3xl pb-3 font-bold leading-tight tracking-tight text-slate-800 dark:text-black">
            Selamat Datang Kembali
          </h1>
          <p className="text-base font-medium pb-12">
            Silahkan masuk ke akun anda
          </p>
          <form className="space-y-4 md:space-y-6 w-full">
            <div>
              <label className="block mb-3 text-lg font-medium text-gray-900">
                Email
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 focus:outline-red-600 rounded-lg"
                placeholder="jhonedoe@gmail.com"
              />
            </div>
            <div>
              <label className="block mb-3 text-lg font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 focus:outline-red-600 rounded-lg"
                placeholder="password"
              />
            </div>
            <div>
              <p className="text-lg text-black">
                Lupa Password?{" "}
                <Link
                  href="/register"
                  className="font-medium text-primary-600 hover:underline text-primary">
                  Klik Di sini
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="btn w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Masuk
            </button>
          </form>
          <div>
            <p className="text-center text-lg font-normal pt-7 text-black">
              Tidak punya akun?{" "}
              <Link
                href="/register"
                className="font-semibold text-primary-600 hover:underline text-primary">
                Daftar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
