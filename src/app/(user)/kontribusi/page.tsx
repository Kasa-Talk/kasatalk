"use client";

import { useState } from "react";
type EventHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;

export default function Page() {
  const [kataIndo, setKataIndo] = useState("");
  const [kataSasak, setKataSasak] = useState("");
  const [penggunaanKata, setPenggunaanKata] = useState("");

  const onHandlerKataIndo: EventHandler = (event) => {
    setKataIndo(event.target.value);
  };

  const onHandlerKataSasak: EventHandler = (event) => {
    setKataSasak(event.target.value);
  };

  const onHandlerPenggunaanKata: EventHandler = (event) => {
    setPenggunaanKata(event.target.value);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <form className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-primary text-2xl font-semibold">Silakan Tambah Kosa Kata Bahasa Sasak</h1>
        <div className="space-y-3"> 
          <h2 className="text-md">Bahasa Indonesia</h2>
          <input
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
            className="rounded-md text-lg px-4 h-10 w-full border-2 focus:outline-primary"
            type="text"
            placeholder="Medaran"
            onChange={onHandlerKataSasak}
            value={kataSasak}
          />
        </div>
        <div className="space-y-3"> 
          <h2 className="text-md">Contoh Penggunaan Kata</h2>
          <input
            className="rounded-md text-lg px-4 h-10 w-full border-2 focus:outline-primary"
            type="text"
            placeholder="Wah Side Medaran?"
            onChange={onHandlerPenggunaanKata}
            value={penggunaanKata}
          />
        </div>
        <button
          type="submit"
          className="btn font-medium h-10 w-full bg-primary text-white">
          {" "}
          Submit
        </button>
      </form>
    </div>
  );
}
