"use client";

import { useState } from "react";
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
    
    if (file != null) {
      formAudio.append("audio", file);
    }

    const body = {
      kataIndo,
      kataSasak,
      penggunaanKataIndo,
      penggunaanKataSasak,
    };

    formAudio.append("data", JSON.stringify(body));

    try {
      const response = await fetch("endpoint", {
        method: "POST",
        body: formAudio,
        headers: {
          "Content-Type": "application/json",
          // Tambahkan header lain jika diperlukan
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Upload successful:", data);
      } else {
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during upload:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <form className="max-w-2xl mx-auto space-y-6" onSubmit={onSubmitKata}>
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
            onChange={onHandlerFile}
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
