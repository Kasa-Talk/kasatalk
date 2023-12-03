"use client";

export default function Page() {
  return (
    <div className="px-4">
      <div className="bg-white max-w-6xl mx-auto p-4 my-6 border rounded-lg">
        <form className="space-y-4 md:space-y-6">
          <div>
            <label className="block mb-3 text-lg font-medium text-gray-900">
              Nama
            </label>
            <input
              type="text"
              // value={}
              className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 px-4 rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-3 text-lg font-medium text-gray-900">
              Password Lama
            </label>
            <input
              type="password"
              // value={}
              className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 px-4 rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-3 text-lg font-medium text-gray-900">
              Password Baru
            </label>
            <input
              type="password"
              // value={}
              className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 px-4 rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-3 text-lg font-medium text-gray-900">
              Konfirmasi Password
            </label>
            <input
              type="password"
              // value={}
              className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 px-4 rounded-lg"
            />
          </div>
          <button className="mt-6 btn w-full font-medium text-base px-5 py-2.5 ">
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}
