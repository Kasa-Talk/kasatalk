"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import getBaseURL from "@/libs/getBaseUrl";
import { setCookie } from "cookies-next";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  success: boolean;
}

const Page: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = {
      email,
      password,
    };

    console.log(body);

    try {
      const response = await fetch(
        "https://kasa-talk-tpe6yyswta-as.a.run.app/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const {
        accessToken,
        refreshToken,
      }: { accessToken: string; refreshToken: string } = await response.json();

      if (response.ok) {
        setCookie("accessToken", accessToken);
        setCookie("refreshToken", refreshToken);
        alert("Login successful!");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log("Error during login:", error);
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
      <div className="bg-primary hidden md:flex justify-end">
        <Image
          src={"/asset/batik-icon-vertikal.svg"}
          width={100}
          height={100}
          alt="batik-image"
        />
      </div>
      <div className="flex items-center justify-center">
        <div className="max-w-2xl px-4 w-full">
          <h1 className="md:text-4xl text-3xl pb-3 font-bold leading-tight tracking-tight text-slate-800 dark:text-black">
            Selamat Datang Kembali
          </h1>
          <p className="text-base font-medium pb-12">
            Silahkan masuk ke akun anda
          </p>
          <form
            className="space-y-4 md:space-y-6 w-full"
            onSubmit={submitLogin}>
            <div>
              <label className="block mb-3 text-lg font-medium text-gray-900">
                Email
              </label>
              <input
                onChange={handlerEmail}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 focus:outline-red-600 rounded-lg"
                placeholder="jhonedoe@gmail.com"
              />
            </div>
            <div>
              <label className="block mb-3 text-lg font-medium text-gray-900">
                Password
              </label>
              <input
                onChange={handlerPassword}
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 focus:outline-red-600 rounded-lg"
                placeholder="password"
              />
            </div>
            <div>
              <p className="md:text-lg text-black">
                Lupa Password?{" "}
                <Link
                  href="/register"
                  className="font-medium text-primary-600 hover:underline text-primary">
                  Klik Di sini
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="btn w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Masuk
            </button>
          </form>
          <div>
            <p className="text-center md:text-lg font-normal pt-7 text-black">
              Tidak punya akun?{" "}
              <Link
                href="/register"
                className="font-semibold text-primary-600 hover:underline text-primary">
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
