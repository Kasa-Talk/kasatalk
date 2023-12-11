"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import getBaseURL from "@/libs/getBaseUrl";
import { setCookie } from "cookies-next";
import { ToastContainer, toast } from "react-toast";
import { ErrorMessage } from "@/components/message";
import { useRouter } from "next/navigation";
import ForgotPassword from "@/components/forgotPassword";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  success: boolean;
}

const Page: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMesage] = useState<string>("");
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const router = useRouter();

  const errorInfo = errorMessage ? <ErrorMessage title={errorMessage} /> : null;

  const submitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = {
      email,
      password,
    };

    try {
      setIsLoad(true);
      const response = await fetch(getBaseURL("/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const {
        accessToken,
        refreshToken,
        errors,
      }: { accessToken: string; refreshToken: string; errors: string } =
        await response.json();

      if (response.ok) {
        setCookie("accessToken", accessToken);
        setCookie("refreshToken", refreshToken);
        router.push("/");
      } else {
        setIsLoad(false);
        errors.includes("User not found")
          ? setErrorMesage("Pengguna tidak ditemukan")
          : setErrorMesage("Password Salah");
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handlerEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlerPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className="grid md:grid-cols-2 h-screen">
      <ToastContainer delay={5000} />
      <div className="bg-primary hidden md:flex justify-end">
        <Image src={'/asset/batik-icon-vertikal.svg'} width={100} height={100} alt="batik-image" />
      </div>
      <div className="flex items-center justify-center h-screen px-4">
        <div className="max-w-2xl px-4 w-full">
          <div className="flex md:flex-row flex-col-reverse md:items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl pb-3 font-bold leading-tight tracking-tight text-gray-900 dark:text-black mt-6">Selamat Datang Kembali</h1>
              <p className="text-base font-medium pb-6">Silahkan masuk ke akun anda</p>
            </div>
            <Link href={'/'}>
              <Image src={'/logo.svg'} width={80} height={57} alt="batik-image" />
            </Link>
          </div>
          <form className="space-y-4 md:space-y-6 w-full" onSubmit={submitLogin}>
            <div>
              <label className="block mb-3 text-lg font-medium text-gray-900">Email</label>
              <input required onChange={handlerEmail} type="email" className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 focus:outline-red-600 rounded-lg" placeholder="jhonedoe@gmail.com" />
            </div>
            <div>
              <label className="block mb-3 text-lg font-medium text-gray-900">Password</label>
              <input required onChange={handlerPassword} type="password" className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 focus:outline-red-600 rounded-lg" placeholder="password" />
            </div>
            {errorInfo}
            <div>
              <div className="md:text-md text-black">
                Lupa Password? <ForgotPassword />
              </div>
            </div>
            <button type="submit" className={`btn w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>
              {isLoad ? <div className="custom-loader mx-auto"></div> : 'Masuk'}
            </button>
          </form>
          <div>
            <p className="text-center md:text-lg font-normal pt-7 text-black">
              Belum punya akun?{' '}
              <Link href="/register" className="font-semibold text-primary-600 hover:underline text-primary">
                Daftar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
