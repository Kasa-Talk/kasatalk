"use client";

import Image from "next/image";

export default function Page() {
  return (
    <div className="bg-white max-w-6xl mx-auto p-4 my-6 border rounded-lg text-center">
      <Image
        src="/asset/please-login.png"
        width={500}
        height={500}
        alt=""
        className="mt-5 mx-auto"
      />
      <p className="mt-5 mb-3 text-3xl font-semibold text-gray-900">
        Login dulu yah
      </p>
      <p className="mt-5 mb-5">
        Silahkan login atau membuat akun terlebih dahulu untuk dapat memulai
        berkontribusi
      </p>
    </div>
  );
}
