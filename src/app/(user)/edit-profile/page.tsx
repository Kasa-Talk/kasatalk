'use client';

export default function Page() {
  return (
    <div className="px-4">
      <div className="bg-white max-w-6xl mx-auto p-4 my-6 border rounded-lg">
        <form className="space-y-4 md:space-y-6">
          <div>
            <label className="block mb-3 text-lg font-medium text-gray-900">
              Nama
            </label>
            <p className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 rounded-lg">
              John Doe
            </p>
          </div>
          <div>
            <label className="block mb-3 text-lg font-medium text-gray-900">
              Password Lama
            </label>
            <p className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 rounded-lg">
              ********
            </p>
          </div>
          <div>
            <label className="block mb-3 text-lg font-medium text-gray-900">
              Password Baru
            </label>
            <p className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 rounded-lg">
              ********
            </p>
          </div>
          <div>
            <label className="block mb-3 text-lg font-medium text-gray-900">
              Konfirmasi Password
            </label>
            <p className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 rounded-lg">
              ********
            </p>
          </div>
          <button 
            type="submit"
            className="w-full text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}