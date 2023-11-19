'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-20">
      <nav className="flex justify-between p-4 items-center max-w-6xl mx-auto">
        <div className="logo">
          <Link href={'/'}>
            <Image src={'/logo.svg'} width={60} height={43} alt="Logo Kasa Talk" className="" />
          </Link>
        </div>
        <div className="menu">
          <ul
            className={`flex md:gap-16 gap-9 md:p-0 md:static md:border-none md:mt-0 md:z-0 md:w-auto md:h-auto md:flex-row fixed bg-white flex-col border border-r-0 border-t-0 mt-[2.40rem] max-[500px]:w-full w-[50%] p-6 h-full right-0 md:transition-none transition-all ease-in-out ${
              isOpen ? 'right-0 duration-300' : 'right-[-100%]'
            }`}
          >
            {menu.map(({ label, link }) => (
              <li key={label} className={`text-black text-base font-medium ${pathname === link ? 'text-primary' : ''}`}>
                <Link href={link} className="hover:text-primary">
                  {label}
                </Link>
              </li>
            ))}
            <button className="btn  py-2 md:hidden block">Masuk</button>
          </ul>
        </div>
        <button className="btn px-8 py-2 md:block hidden">Masuk</button>
        <button className="block md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <RiCloseLine /> : <RiMenu3Line />}
        </button>
      </nav>
    </header>
  );
}

const menu = [
  {
    label: 'Beranda',
    link: '/',
  },
  {
    label: 'Kamus',
    link: '/kamus',
  },
  {
    label: 'Kontribusi',
    link: '/kontribusi',
  },
  {
    label: 'Tentang',
    link: '/tentang',
  },
];
