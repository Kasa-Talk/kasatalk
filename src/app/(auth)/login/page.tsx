import Link from "next/link";

const Page = () => {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div></div>
      <div className="my-auto">
        <h1 className="text-4xl pb-3 text-center font-bold leading-tight tracking-tight text-gray-900 dark:text-black">
          Selamat Datang Kembali
        </h1>
        <p className="text-base font-medium pb-12">Silahkan masuk ke akun anda</p>
        <form className="space-y-4 md:space-y-6">
          <div>
            <label className="block mb-3 text-lg font-medium text-gray-900">
              Email
            </label>
            <input type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 focus:outline-red-600 rounded-lg"
              placeholder="jhonedoe@gmail.com"/>
          </div>
          <div>
            <label className="block mb-3 text-lg font-medium text-gray-900">
              Password
            </label>
            <input type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 focus:outline-red-600 rounded-lg"
                  placeholder="password"/>
          </div>
          <button 
            type="submit"
            className="w-full text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Masuk
          </button>
        </form>
        <div>
        <p className="text-center text-lg font-semibold pt-7 text-black">
          Tidak punya akun? <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary">Daftar</Link>
        </p>
        </div>
      </div>
    </div>
  )
}

export default Page;
