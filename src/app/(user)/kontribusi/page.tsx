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
  const [fileURL, setFileURL] = useState<string>("");

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

    const body = {
      indonesia: kataIndo,
      sasak: kataSasak,
      contohPenggunaanIndo: penggunaanKataIndo,
      contohPenggunaanSasak: penggunaanKataSasak,
      audio: file?.name,
    };

    console.log(body);

    // try {
    //   const response = await fetch(getBaseURL("/kata"), {
    //     method: "POST",
    //     body: body,
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
      <h1 className="text-primary text-2xl font-semibold text-center">
        Silakan Tambah Kosa Kata Bahasa Sasak
      </h1>
      <form
        className="max-w-2xl mx-auto space-y-6 my-8"
        onSubmit={onSubmitKata}
        encType="multipart/form-data">
        <div className="space-y-3">
          <label className="text-md">Bahasa Indonesia</label>
          <input
            required
            className="rounded-md text-lg px-4 h-10 w-full border focus:outline-primary"
            type="text"
            placeholder="Makan"
            onChange={onHandlerKataIndo}
            value={kataIndo}
          />
        </div>
        <div className="space-y-3">
          <label className="text-md">Bahasa Sasak</label>
          <input
            required
            className="rounded-md text-lg px-4 h-10 w-full border focus:outline-primary"
            type="text"
            placeholder="Medaran"
            onChange={onHandlerKataSasak}
            value={kataSasak}
          />
        </div>
        <div className="space-y-3">
          <label className="text-md">
            Contoh Penggunaan Kata Dalama Bahasa Indonesia
          </label>
          <input
            required
            className="rounded-md text-lg px-4 h-10 w-full border focus:outline-primary"
            type="text"
            placeholder="Kamu Sudah Makan?"
            onChange={onHandlerPenggunaanKataIndo}
            value={penggunaanKataIndo}
          />
        </div>
        <div className="space-y-3">
          <label className="text-md">
            Contoh Penggunaan Kata Dalama Bahasa Sasak
          </label>
          <input
            required
            className="rounded-md text-lg px-4 h-10 w-full border focus:outline-primary"
            type="text"
            placeholder="Wah Side Medaran?"
            onChange={onHandlerPenggunaanKataSasak}
            value={penggunaanKataSasak}
          />
        </div>
        <div className="space-y-3">
          <label className="text-md">Unggah Suara Kata</label>
          <input
            required
            type="file"
            accept=".mp3, .wav, .mpeg"
            className="block w-full text-sm file:mr-4 file:rounded-s-md border rounded-md file:border-0 file:bg-primary file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white focus:outline-none file:cursor-pointer"
            onChange={onHandlerFile}
          />
          <p className="text-sm text-gray-400">.mp3 (Max 1 mb)</p>
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
