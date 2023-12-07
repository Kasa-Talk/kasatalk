'use client';

import Image from 'next/image';
import { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import WordCard from '@/components/wordCard';
import WordSkeleton from '@/components/wordSkeleton';

interface Word {
  indonesia: string;
  sasak: string;
  audioUrl: string;
  contohPenggunaanSasak: string;
  contohPenggunaanIndo: string;
}
export default function Page() {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [words, setWords] = useState<Word[]>([]);
  const [ilustration, setIlustration] = useState(true);
  const [isIndonesia, setIsIndonesia] = useState(false);

  console.log(words);
  const handleSearch = async () => {
    if (!searchValue) return;
    setIlustration(false);
    setIsLoading(true);

    setWords([]);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/kata/translate?indonesia=${isIndonesia}&search=${searchValue}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const wordsData = await response.json();
      setWords(wordsData.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchs = () => {
    setIsIndonesia(!isIndonesia);
    setWords([]);
    setSearchValue('');
  };

  return (
    <div className="px-4">
      <div className="bg-white max-w-6xl mx-auto p-4 my-6 border rounded-lg min-h-[35rem]">
        <div className="max-w-4xl mx-auto mt-6">
          <div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" onClick={handleSwitchs} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              <span className="ms-3 text-base font-semibold text-black peer-checked:text-primary">{!isIndonesia ? 'Sasak ke Indonesia' : 'Indonesia ke Sasak'}</span>
            </label>
          </div>
          <div className="flex max-w-4xl mx-auto gap-4 mt-6">
            <input type="text" value={searchValue}  onChange={(e) => setSearchValue(e.target.value)} className="border rounded-full py-[0.65rem] px-4 w-full focus:border-primary outline-none" placeholder="Cari kata ex: apa, dimana" />
            <button className="btn px-3 py-2" onClick={handleSearch}>
              {isLoading ? (
                <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                <RiSearchLine className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {!isLoading && words.length === 0 && !ilustration && <p className="text-lg not-found text-center mt-10">Kata belum tersedia</p>}

        {!isLoading && words.length > 0 && (
          <ul className="mt-10">
            {words.map((word, index) => (
              <li key={index}>
                <WordCard indonesia={word.indonesia} sasak={word.sasak} audioUrl={word.audioUrl} contohPenggunaanIndo={word.contohPenggunaanIndo} contohPenggunaanSasak={word.contohPenggunaanSasak} isIndonesia={isIndonesia} />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10">{isLoading && <WordSkeleton />}</div>

        {ilustration && (
          <div className="my-16 flex flex-col items-center">
            <Image src={'/asset/search-ilustration.svg'} width={200} height={245} alt="search ilustration" />
            <p className="mt-5 text-zinc-500">Kata apa yang ingin kamu cari?</p>
          </div>
        )}
      </div>
    </div>
  );
}
