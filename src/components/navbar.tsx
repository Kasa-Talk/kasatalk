/* eslint-disable @next/next/no-img-element */
'use client';

import { getCookie, deleteCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

interface UserData {
  name: string;
  avatarUrl: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getCookie('accessToken');

        console.log(token);

        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/users', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const fetchedData = await response.json();
        setUserData(fetchedData.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    router.push('/');
    window.location.reload();
  };

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
            className={`flex md:gap-16 gap-9 md:p-0 md:static md:border-none md:mt-0 md:z-0 md:w-auto md:h-auto md:flex-row fixed bg-white flex-col border border-r-0 border-t-0 mt-[2.40rem] max-[500px]:w-full w-[50%] p-6 h-full right-0 lg:transition-none transition-all ease-in-out  ${
              isOpen ? 'right-0 duration-500' : 'right-[-100%] duration-500'
            }`}
          >
            {menu.map(({ label, link }) => (
              <li key={label} className={`text-black text-base font-medium ${pathname === link ? 'text-primary font-semibold' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                <Link href={link} className="hover:text-primary">
                  {label}
                </Link>
              </li>
            ))}
            {!userData && (
              <button className={`btn py-2 md:hidden block`}>
                <Link href={'/login'}>Masuk</Link>
              </button>
            )}
          </ul>
        </div>

        <div className="flex gap-6">
          <div>
            {userData ? (
              <div className="relative">
                <div className={`flex gap-4 items-center px-4 py-2 rounded-md hover:bg-[#F3F4F6] cursor-pointer ${openModal ? 'bg-[#F3F4F6]' : ''}`} onClick={() => setOpenModal(!openModal)}>
                  <img src={userData?.avatarUrl} alt={userData?.name} className="w-6" />
                  <p>{userData?.name}</p>
                </div>
                <div className={`absolute bg-white border p-4 w-40  rounded-md  mt-[1.10rem] -z-10 right-0 ${openModal ? 'block' : 'hidden'}`}>
                  <ul className="flex flex-col gap-2">
                    <li className="cursor-pointer hover:bg-[#F3F4F6] p-2 rounded-md">Dashboard</li>
                    <li className="cursor-pointer hover:bg-[#F3F4F6] p-2 rounded-md">Profile</li>
                    <li className="cursor-pointer hover:bg-[#F3F4F6] p-2 rounded-md text-primary" onClick={handleLogout}>
                      Keluar
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <button className={`btn px-8 py-2 md:block hidden`} onClick={() => setIsOpen(!isOpen)}>
                <Link href={'/login'}>Masuk</Link>
              </button>
            )}
          </div>
          <button className="block md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <RiCloseLine /> : <RiMenu3Line />}
          </button>
        </div>
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
