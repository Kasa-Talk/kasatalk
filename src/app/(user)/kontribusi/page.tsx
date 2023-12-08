"use client";

import { getCookie, hasCookie } from "cookies-next";
import { useState } from "react";
import Image from "next/image";
import getBaseURL from "@/libs/getBaseUrl";
type EventHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;

export default function Page() {
  const [kataIndo, setKataIndo] = useState<string>("");
  const [kataSasak, setKataSasak] = useState<string>("");
  const [penggunaanKataIndo, setPenggunaanKataIndo] = useState<string>("");
  const [penggunaanKataSasak, setPenggunaanKataSasak] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const onHandlerKataIndo: EventHandler = (event) => {
    setKataIndo(event.target.value);
  };

  const onHandlerKataSasak: EventHandler = (event) => {
    setKataSasak(event.target.value);
  };

  const onHandlerPenggunaanKataIndo: EventHandler = (event) => {
    setPenggunaanKataIndo(event.target.value);
  };

  const onHandlerPenggunaanKataSasak: EventHandler = (event) => {
    setPenggunaanKataSasak(event.target.value);
  };

  const onHandlerFile: EventHandler = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const onSubmitKata = async (event: any) => {
    event.preventDefault();
    const formAudio = new FormData();

    const body = {
      indonesia: kataIndo,
      sasak: kataSasak,
      contohPenggunaanIndo: penggunaanKataIndo,
      contohPenggunaanSasak: penggunaanKataSasak,
      formAudio
    };

    if (file != null) {
      formAudio.append("audio", file);
    }

    // try {
    //   const response = await fetch(getBaseURL("/kata"), {
    //     method: "POST",
    //     body: formAudio,
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${getCookie("accessToken")}`,
    //     },
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log("Upload successful:", data);
    //   } else {
    //     console.error("Upload failed:", response.statusText);
    //   }
    // } catch (error) {
    //   console.error("Error during upload:", error);
    // }
  };

  const cookie = hasCookie("accessToken");
  if (!cookie) {
    return (
      <div className="px-4">
        <div className="bg-white max-w-6xl mx-auto p-4 my-6 border rounded-lg text-center">
          <Image
            src="/asset/please-login.png"
            width={500}
            height={500}
            alt=""
            className="mt-5 mx-auto"
          />
          <h1 className="mt-5 mb-3 text-3xl font-semibold text-gray-900">
            Login dulu yah
          </h1>
          <p className="mt-5 mb-5">
            Silahkan login atau membuat akun terlebih dahulu untuk dapat memulai
            berkontribusi
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <form
        className="max-w-2xl mx-auto space-y-6"
        onSubmit={onSubmitKata}
        encType="multipart/form-data">
        <h1 className="text-primary text-2xl font-semibold">
          Silakan Tambah Kosa Kata Bahasa Sasak
        </h1>
        <div className="space-y-3">
          <h2 className="text-md">Bahasa Indonesia</h2>
          <input
            required
            className="rounded-md text-lg px-4 h-10 w-full border-2 focus:outline-primary"
            type="text"
            placeholder="Makan"
            onChange={onHandlerKataIndo}
            value={kataIndo}
          />
        </div>
        <div className="space-y-3">
          <h2 className="text-md">Bahasa Sasak</h2>
          <input
            required
            className="rounded-md text-lg px-4 h-10 w-full border-2 focus:outline-primary"
            type="text"
            placeholder="Medaran"
            onChange={onHandlerKataSasak}
            value={kataSasak}
          />
        </div>
        <div className="space-y-3">
          <h2 className="text-md">
            Contoh Penggunaan Kata Dalama Bahasa Indonesia
          </h2>
          <input
            required
            className="rounded-md text-lg px-4 h-10 w-full border-2 focus:outline-primary"
            type="text"
            placeholder="Kamu Sudah Makan?"
            onChange={onHandlerPenggunaanKataIndo}
            value={penggunaanKataIndo}
          />
        </div>
        <div className="space-y-3">
          <h2 className="text-md">
            Contoh Penggunaan Kata Dalama Bahasa Sasak
          </h2>
          <input
            required
            className="rounded-md text-lg px-4 h-10 w-full border-2 focus:outline-primary"
            type="text"
            placeholder="Wah Side Medaran?"
            onChange={onHandlerPenggunaanKataSasak}
            value={penggunaanKataSasak}
          />
        </div>
        <div className="space-y-3">
          <h2 className="text-md">Masukan Suara Kata</h2>
          <input
            required
            className="rounded-md text-lg px-4 h-10 w-full border-2 focus:outline-primary"
            type="file"
            accept=".mp3, .wav, .mpeg"
            onChange={onHandlerFile}
            multiple={false}
          />
        </div>
        <button
          type="submit"
          className="btn font-medium h-10 w-full bg-primary text-white">
          Submit
        </button>
      </form>
    </div>
  );
}
