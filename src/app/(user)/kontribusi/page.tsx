"use client";

import { useState } from "react";

export default function Page() {
  const [kataIndo, setKataIndo] = useState("");

  return (
    <div className="max-w-6xl mx-auto p-4">
      <form className="max-w-2xl mx-auto space-y-6">
        <h1>Silakan Masukan Bahasa ...</h1>
        <div className="space-y-3">
          <h2 className="text-md">Bahasa Indonesia</h2>
          <input
            className="rounded-md text-lg px-4 h-10 w-full border-2 focus:outline-primary"
            type="text"
            placeholder="Makan"
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
