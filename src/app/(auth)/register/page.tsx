'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorMessage, SuccessMessage } from '@/components/message';

const Page = () => {
  const router = useRouter();
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
        }),
      });

      if (res.ok) {
        setTimeout(() => {
          router.push('/email-verification');
        }, 1000);
      }

      const data = await res.json();

      if (data.message === 'User created, please check your email to activate your account') {
        setMessage(data.message);
      }

      if (data.errors) {
        if (data.errors.includes('Account already registered, please check your email to activate your account')) {
          setMessage('Akun email sudah terdaftar, mohon periksa email anda untuk aktivasi akun anda');
        } else if (data.errors.includes('Account already activated')) {
          setMessage('Alamat email sudah digunakan');
        } else if (data.errors.includes('Password does not match')) {
          setMessage('Password tidak sama');
        } else if (data.errors.includes('password must be at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 symbol')) {
          setMessage('Password harus memilki setidaknya 8 karakter, 1 huruf besar, 1 huruf kecil, 1 huruf dan 1 simbol');
        }
      }
    } catch (error) {
      console.log(error);
      setMessage('Server sedang mengalami masalah. Mohon coba lagi nanti');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="block md:grid grid-cols-2 h-screen gap-6 lg:max-h-screen">
      <div className="bg-primary hidden md:flex justify-end">
        <Image src={'/asset/batik-icon-vertikal.svg'} width={100} height={100} alt="batik-image" />
      </div>
      <div className="my-auto px-4 md:w-full max-w-2xl mx-auto md:mt-4 mt-10">
        <div className="flex md:flex-row flex-col-reverse md:items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl pb-3 font-bold leading-tight tracking-tight text-gray-900 dark:text-black mt-6">Buat Akun Anda</h1>
            <p className="text-base font-medium pb-6">Silahkan daftar untuk membuat akun</p>
          </div>
          <Link href={'/'}>
            <Image src={'/logo.svg'} width={80} height={57} alt="batik-image" />
          </Link>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-900">Nama</label>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2 focus:outline-primary rounded-lg" required placeholder="Nama Lengkap" onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-900">Email</label>
            <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2 focus:outline-primary rounded-lg" placeholder="johndoe@gmail.com" required onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-900">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2 focus:outline-primary rounded-lg"
              placeholder="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-900">Konfirmasi Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2 focus:outline-primary rounded-lg"
              placeholder="konfirmasi password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
            <label htmlFor="showPassword">Tampilkan Password</label>
          </div>

          <div>{message ? message === 'User created, please check your email to activate your account' ? <SuccessMessage title="Daftar akun berhasil" /> : <ErrorMessage title={message} /> : ''}</div>

          <button className="w-full py-2 btn mt-2 flex justify-center" type="submit">
            {isLoading ? <div className="custom-loader mx-auto"></div> : 'Daftar'}
          </button>
        </form>
        <div className="pb-4">
          <p className="text-center text-lg font-medium pt-4 text-black">
            Sudah punya akun?{' '}
            <Link href="/login" className="font-medium text-primary-600 hover:underline text-primary">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
