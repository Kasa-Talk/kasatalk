/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { getCookie, hasCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import { ErrorMessage, SuccessMessage } from '@/components/message';
import { analytics } from '@/app/firebase/firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

interface UserData {
  name: string;
  email: string;
  avatarUrl: string;
}

export default function Page() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  // const [uploadAvatarLoading, setUploadAvatarLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [avatarUrl, setAvatarUrl] = useState<string | undefined>('');

  const [name, setName] = useState<string | undefined>('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfrimPassword] = useState('');

  const [btnEditLoad, setBtnEditLoad] = useState(false);

  const [file, setFile] = useState<File | null>(null);

  // const headleUploadAvatar = async (event: any) => {
  //   event.preventDefault();
  //   console.log(file);

  //   setUploadAvatarLoading(true);

  //   const idAvatar = uuidv4();

  //   const avatarName = `${idAvatar}-${file?.name}`;
  //   if (file) {
  //     const fileRef = ref(analytics, `kasa-talk-avatar/${avatarName}`);
  //     uploadBytes(fileRef, file).then((data) => {
  //       getDownloadURL(data.ref).then((url) => {
  //         console.log('url', url);
  //         setAvatarUrl(url);
  //       });
  //     });
  //   } else {
  //     alert('belum ada file');
  //   }

  //   try {
  //     const token = getCookie('accessToken');
  //     const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/users/avatar', {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ avatarUrl }),
  //     });

  //     if (res.ok) {
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 1000);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setUploadAvatarLoading(false);
  //   }
  // };

  const handleFileSelect = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAvatarUrl(reader.result as string);
      };
    }
  };

  const handleEdit = async (e: any) => {
    e.preventDefault();

    let requestBody = {};

    if (name !== userData?.name) {
      requestBody = { name };
    }

    if (avatarUrl) {
      requestBody = { avatarUrl };
    }

    if (password && confirmPassword) {
      requestBody = { password, confirmPassword };
    }

    if (name !== userData?.name && avatarUrl && password && confirmPassword) {
      requestBody = { name, avatarUrl, password, confirmPassword };
    }

    const idAvatar = uuidv4();

    const avatarName = `${idAvatar}-${file?.name}`;
    if (file) {
      const fileRef = ref(analytics, `kasa-talk-avatar/${avatarName}`);
      uploadBytes(fileRef, file).then((data) => {
        getDownloadURL(data.ref).then((url) => {
          console.log('url', url);
          setAvatarUrl(url);
        });
      });
    } else {
      alert('belum ada file');
    }

    try {
      setBtnEditLoad(true);
      const token = getCookie('accessToken');

      const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/users', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();

      if (data.message === 'User updated successfully') {
        setMessage(data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }

      if (data.errors) {
        if (data.errors.includes('Password not match')) {
          setMessage('Password tidak sama');
        } else if (data.errors.includes('password most be at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 symbol')) {
          setMessage('Password harus memilki setidaknya 8 karakter, 1 huruf besar, 1 huruf kecil, 1 huruf dan 1 simbol');
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBtnEditLoad(false);
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

        const dataUser = await response.json();
        setUserData(dataUser.data);
        setName(dataUser.data.name);
        setAvatarUrl(dataUser.data.avatarUrl);
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
        <div className="bg-white max-w-6xl mx-auto p-4 my-6 border rounded-lg">
          <div className="max-w-4xl mx-auto px-4">
            <div className="rounded-full bg-gray-300 h-32 mx-auto place-content-center aspect-square overflow-hidden mt-10">
              <img src={avatarUrl} width={130} height={200} alt="No Photo" className="object-cover h-32" />
            </div>

            <div className="flex gap-3 justify-center mt-6">
              <label htmlFor="upload-avatar">
                <p className="bg-none w-max px-4 py-2 rounded-full border-primary border text-center cursor-pointer">Ganti Foto</p>
                <input id="upload-avatar" type="file" accept="image/*" className="hidden" onChange={(event: any) => handleFileSelect(event)} />
              </label>
            </div>
          </div>
          <form className="space-y-4 md:space-y-6 max-w-4xl mx-auto my-10">
            <div>
              <label className="block mb-3 text-lg font-medium text-gray-900">Nama</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 px-4 rounded-lg" />
            </div>
            <div>
              <label className="block mb-3 text-lg font-medium text-gray-900">Email</label>
              <input type="text" value={userData?.email} disabled className="bg-gray-200 border border-gray-300 text-gray-900 w-full p-2.5 px-4 rounded-lg" />
            </div>
            <div>
              <label className="block mb-3 text-lg font-medium text-gray-900">Password Baru</label>
              <input type="password" onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 px-4 rounded-lg" />
            </div>
            <div>
              <label className="block mb-3 text-lg font-medium text-gray-900">Konfirmasi Password</label>
              <input type="password" onChange={(e) => setConfrimPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 px-4 rounded-lg" />
            </div>
            <div>{message ? message === 'User updated successfully' ? <SuccessMessage title="Data berhasil diubah" /> : <ErrorMessage title={message} /> : ''}</div>
            <button className="mt-6 btn w-full font-medium text-base px-5 py-2.5" onClick={handleEdit}>
              {btnEditLoad ? <div className="custom-loader mx-auto"></div> : 'Simpan Perubahan'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
