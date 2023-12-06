"use client";

import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div className="px-4">
      <div className="bg-white max-w-6xl mx-auto p-4 my-6 border rounded-lg">
        <div className="rounded-full bg-gray-300 h-32 mx-auto place-content-center aspect-square overflow-hidden">
          <Image src="/images/dummyImage.jpeg" width={130} height={200} alt="No Photo" />
        </div>
        <form className="space-y-4 md:space-y-6">
          <div>
            <label className="block mb-3 text-lg font-medium text-gray-900">
              Nama
            </label>
            <input
              type="text"
              value={`Jhon Doe`}
              className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 px-4 rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-3 text-lg font-medium text-gray-900">
              Email
            </label>
            <input
              type="text"
              value={`jhondoe@gmail.com`}
              className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 px-4 rounded-lg"
            />
          </div>
          <Link href={"/edit-profile"}>
            <button className="mt-6 btn w-full font-medium text-base px-5 py-2.5 ">
              Edit
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
