/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCookie, hasCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import Dialog from '@/components/dialog';

interface UserData {
  name: string;
  email: string;
  avatarUrl: string;
}

export default function Page() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [close, setClose] = useState(true);

  const handleDeleteAccount = async (e: any) => {
    e.preventDefault();
    try {
      setBtnLoading(true);
      const token = getCookie('accessToken');
      const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/users', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        router.push('/');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = hasCookie('accessToken');

        if (!accessToken) {
          router.push('/login');
        }
        setIsLoading(true);
        const token = getCookie('accessToken');

        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/users', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const fetchedData = await response.json();
        setUserData(fetchedData.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="px-4">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-white max-w-6xl mx-auto p-4 my-6 py-10 border rounded-lg">
          <div className="rounded-full bg-gray-300 h-32 mx-auto place-content-center aspect-square overflow-hidden">
            <img src={userData?.avatarUrl} width={130} height={200} alt="profile-picture" className="object-cover h-32" />
          </div>
          <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto mt-10">
            <div>
              <label className="block mb-3 text-lg font-medium text-gray-900">Nama</label>
              <input type="text" value={userData?.name} className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 px-4 rounded-lg focus:border-primary focus:outline-none" disabled />
            </div>
            <div>
              <label className="block mb-3 text-lg font-medium text-gray-900">Email</label>
              <input type="text" value={userData?.email} disabled className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 px-4 rounded-lg focus:border-primary focus:outline-none" />
            </div>
            <div className="flex max-w-4xl justify-center items-center gap-4 pt-3">
              <button className="border border-primary font-medium text-red-600 rounded-full px-4 py-2.5" onClick={() => setClose(!close)} type="button">
                Hapus Akun
              </button>
              <Link href={'/edit-profile'} className="btn font-medium text-base px-5 py-2.5 ">
                Ubah Profil
              </Link>
            </div>
          </div>
          <Dialog
            title="Hapus Akun"
            subtitle="Apakah anda yakin untuk menghapus akun anda?"
            submitText="Hapus"
            cancelText="Tidak"
            className={`${close ? 'hidden' : 'open'}`}
            onCancel={() => setClose(!close)}
            onSubmit={handleDeleteAccount}
            onClose={() => setClose(!close)}
            isLoading={btnLoading}
          />
        </div>
      )}
    </div>
  );
}
