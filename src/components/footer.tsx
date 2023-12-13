'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Dialog from './dialog';
import { RiMailAddLine } from 'react-icons/ri';
import { ErrorMessage, SuccessMessage } from './message';

export default function Footer() {
  const [close, setClose] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [statusMessage, setStatusMessage] = useState('');

  const handleClose = () => {
    setClose(!close);
    setStatusMessage('');
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmitEmail = async (e: any) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setStatusMessage('Masukkan alamat email yang valid');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          subject,
          message,
        }),
      });

      if (res.ok) {
        setEmail('');
        setName('');
        setSubject('');
        setMessage('');
      }

      const data = await res.json();

      console.log(data);
      console.log(data.message);

      if (data.message === 'Success Send Message Email') {
        setStatusMessage('Pesan berhasil dikirim');
      }

      if (data.errors.includes('email is required')) {
        setStatusMessage('Masukin alamat email');
      } else if (data.errors.includes('name is required')) {
        setStatusMessage('Masukin nama anda');
      } else if (data.errors.includes('subject is required')) {
        setStatusMessage('Masukin subject');
      } else if (data.errors.includes('message is required')) {
        setStatusMessage('Masukin pesan anda');
      }
    } catch (error) {
      console.log(error);
      setMessage('Pesan gagal dikirim');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full">
      <Dialog
        title="Hubungi Kami"
        subtitle="Beri kami tanggapan Anda dan bantu kami meningkatkan layanan kami"
        submitText="Kirim"
        cancelText="Batal"
        onCancel={handleClose}
        onClose={handleClose}
        isLoading={isLoading}
        onSubmit={handleSubmitEmail}
        icon={<RiMailAddLine />}
        className={`${close ? 'hidden' : ''}`}
      >
        <form className="mt-6 mb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1 items-start w-full">
                <label className="font-medium">Email</label>
                <input type="email" className="border border-gray-300 bg-gray-50 w-full p-2 rounded-lg" required onChange={(e) => setEmail(e.target.value)} value={email} />
              </div>
              <div className="flex flex-col gap-1 items-start w-full">
                <label className="font-medium">Nama</label>
                <input type="text" className="border border-gray-300 bg-gray-50  w-full p-2 rounded-lg" required onChange={(e) => setName(e.target.value)} value={name} />
              </div>
              <div className="flex flex-col gap-1 items-start w-full">
                <label className="font-medium">Subjek</label>
                <input type="email" className="border border-gray-300 bg-gray-50  w-full p-2 rounded-lg" required onChange={(e) => setSubject(e.target.value)} value={subject} />
              </div>
            </div>
            <div className="flex flex-col gap-1 items-start w-full">
              <label className="font-medium">Pesan</label>
              <textarea name="message" className="border border-gray-300 bg-gray-50  w-full p-2 rounded-lg max-row resize-none h-full" rows={4} onChange={(e) => setMessage(e.target.value)} value={message}></textarea>
            </div>
          </div>
        </form>

        <div className="mt-6">{statusMessage ? statusMessage === 'Pesan berhasil dikirim' ? <SuccessMessage title={statusMessage} /> : <ErrorMessage title={statusMessage} /> : ''}</div>
      </Dialog>
      <footer className="bg-primary text-white">
        <div className="flex flex-col md:flex-row max-w-6xl justify-between mx-auto px-4 py-6 gap-8">
          <div>
            <Image src={'/asset/logo-white.svg'} width={50} height={100} alt="Logo Kasa Talk" />
            <p className="mt-6 max-w-sm">
              Untuk pertanyaan lebih lanjut, silahkan hubungi
              <span onClick={handleClose} className="font-bold underline mx-2 cursor-pointer">
                admin
              </span>
              di sini.
            </p>
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-3">Kasa Talk</h1>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href={'/'}>Beranda</Link>
              </li>
              <li>
                <Link href={'/kamus'}>Kamus</Link>
              </li>
              <li>
                <Link href={'/kontribusi'}>Kontribusi</Link>
              </li>
              <li>
                <Link href={'/tentang'}>Tentang</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto text-center">
          <div className="h-[1px] w-full bg-white"></div>
          <p className="mt-6 pb-5">© 2023 Kasa Talk. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
