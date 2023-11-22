'use client';

import Image from 'next/image';
import { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';

export default function Page() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="px-4">
      <div className="bg-white max-w-6xl mx-auto p-4 my-6 border rounded-lg">
        <div className="flex max-w-4xl mx-auto gap-4 mt-6">
          <input type="text" onChange={(e) => setSearchValue(e.target.value)} className="border rounded-full py-2 px-4 w-full focus:border-primary outline-none" placeholder="Cari kata ex: apa, dimana" />
          <button className="btn px-3 py-2">
            <RiSearchLine className="text-2xl" />
          </button>
        </div>

        <div className="my-16 flex flex-col items-center">
          <Image src={'/asset/search-ilustration.svg'} width={200} height={245} alt="search ilustration" />
          <p className="mt-5 text-zinc-500">Kata apa yang ingin kamu cari?</p>
        </div>
      </div>
    </div>
  );
}
