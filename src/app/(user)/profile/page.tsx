/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCookie, hasCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';

interface UserData {
  name: string;
  email: string;
  avatarUrl: string;
}

export default function Page() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
            <img src={userData?.avatarUrl} width={130} height={200} alt="profile-picture" />
          </div>
          <form className="space-y-4 md:space-y-6 max-w-4xl mx-auto mt-10">
            <div>
              <label className="block mb-3 text-lg font-medium text-gray-900">Nama</label>
              <input type="text" value={userData?.name} className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 px-4 rounded-lg focus:border-primary focus:outline-none" disabled />
            </div>
            <div>
              <label className="block mb-3 text-lg font-medium text-gray-900">Email</label>
              <input type="text" value={userData?.email} disabled className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 px-4 rounded-lg focus:border-primary focus:outline-none" />
            </div>
            <Link href={'/edit-profile'}>
              <button className="mt-6 btn w-full font-medium text-base px-5 py-2.5 ">Edit</button>
            </Link>
          </form>
        </div>
      )}
    </div>
  );
}
