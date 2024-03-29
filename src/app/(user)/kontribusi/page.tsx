"use client";

import { getCookie, hasCookie } from "cookies-next";
import { useRef, useState } from "react";
import getBaseURL from "@/libs/getBaseUrl";
import { analytics } from "@/app/firebase/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { ErrorMessage } from "@/components/message";
type EventHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;

export default function Page() {
  const [kataIndo, setKataIndo] = useState<string>("");
  const [kataSasak, setKataSasak] = useState<string>("");
  const [penggunaanKataIndo, setPenggunaanKataIndo] = useState<string>("");
  const [penggunaanKataSasak, setPenggunaanKataSasak] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const errorInfo = errorMessage ? <ErrorMessage title={errorMessage} /> : null;
  const successInfo = successMessage ? (
    <div
      className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100"
      role="alert">
      {successMessage}
    </div>
  ) : null;

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
    console.log(file);
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoad(true);
    event.preventDefault();

    const idAudio = uuidv4();
    const audioName = `${idAudio}-${file?.name}`;

    const allowedFileTypes = ["audio/x-m4a", "audio/wav", "audio/mpeg"];
    if (file && file.size <= 2000000 && allowedFileTypes.includes(file.type)) {
      const fileRef = ref(analytics, `kasa-talk-audio/${audioName}`);

      uploadBytes(fileRef, file).then((data) => {
        getDownloadURL(data.ref).then(async (url) => {
          const body = {
            indonesia: kataIndo,
            sasak: kataSasak,
            contohPenggunaanIndo: penggunaanKataIndo,
            contohPenggunaanSasak: penggunaanKataSasak,
            audioUrl: `${url}`,
          };

          console.log(body);

          try {
            const response = await fetch(getBaseURL("/kata"), {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("accessToken")}`,
              },
            });

            if (!response.ok) {
              throw new Error(`Upload failed`);
            }
            const responseData = await response.json();
            setSuccessMessage(
              "Kata berhasil diupload, silakan tunggu untuk admin mereview kata"
            );
            setKataIndo("");
            setKataSasak("");
            setPenggunaanKataIndo("");
            setPenggunaanKataSasak("");
            setFile(null);
            setFile(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = ""; // or fileInputRef.current.value = null;
            }
            setIsLoad(false);
          } catch (error) {
            console.error("Error during upload:", error);
          }
        });
      });
    } else {
      setErrorMessage("Ukuran atau format file belum sesuai");
      setIsLoad(false);
      return;
    }
  };

  const cookie = hasCookie("accessToken");
  const router = useRouter();
  if (!cookie && typeof window !== "undefined") {
    router.push("/notLogin");
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 mt-4">
      <h1 className="text-primary text-2xl font-semibold text-center">
        Silakan Tambah Kosa Kata Bahasa Sasak
      </h1>
      <form
        className="max-w-2xl mx-auto space-y-6 my-8"
        onSubmit={onSubmitKata}>
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
            Contoh Penggunaan Kata Dalam Bahasa Indonesia
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
            Contoh Penggunaan Kata Dalam Bahasa Sasak
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
          <label className="text-md">Unggah Suara Kata Bahasa Sasak</label>
          <input
            required
            id="inputAudio"
            type="file"
            accept=".m4a, .mp3, .wav"
            className="block w-full text-sm file:mr-4 file:rounded-s-md border rounded-md file:border-0 file:bg-primary file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white focus:outline-none file:cursor-pointer"
            onChange={onHandlerFile}
            ref={fileInputRef}
          />
          <p className="text-sm text-gray-400">
            Only .m4a, .mp3, .wav (Max 2mb)
          </p>
        </div>
        <button
          type="submit"
          className="btn font-medium h-10 w-full bg-primary text-white">
          {!isLoad ? "Tambah" : <div className="custom-loader mx-auto"></div>}
        </button>
        {errorInfo}
        {successInfo}
      </form>
    </div>
  );
}
