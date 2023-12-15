"use client";

import { RiVolumeUpFill, RiVolumeMuteFill } from "react-icons/ri";
import { FaRegTrashCan } from "react-icons/fa6";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import getBaseURL from "@/libs/getBaseUrl";
import { getCookie } from "cookies-next";
import Dialog from "./dialog";
import { ErrorMessage, SuccessMessage } from "./message";

interface Props {
  indonesia: string;
  sasak: string;
  audioUrl: string;
  contohPenggunaanSasak: string;
  contohPenggunaanIndo: string;
  isIndonesia: boolean;
  id?: string;
  status?: string;
}

export default function WordCard(props: Props) {
  const path = usePathname();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [message, setIsMessage] = useState<string | null>(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const deleteWord = async (id: any) => {
    const cookie = getCookie("accessToken");
    setIsLoading(true);
    try {
      const response = await fetch(getBaseURL(`/kata/${id}`), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
      });

      if (response.ok) {
        setIsMessage("Kata berhasil dihapus");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
      
    } catch (error) {
      setIsMessage("Kata gagal dihapus")
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsMessage("")
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white rounded-md border p-4 max-w-4xl mx-auto mt-5 flex flex-col md:flex-row">
      <div className="flex-1">
        <div className="flex gap-4 items-center">
          <div>
            {props.isIndonesia ? (
              <div className="flex items-center gap-2">
                <p className="font-bold ">{props.indonesia}</p>
                <p className="font-medium italic">({props.sasak})</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p className="font-bold ">{props.sasak}</p>
                <p className="font-medium italic">({props.indonesia})</p>
              </div>
            )}
          </div>
          <audio
            src={props.audioUrl}
            controls
            ref={audioRef}
            hidden
            onEnded={() => setIsPlaying(!isPlaying)}></audio>
          <button onClick={handlePlayPause}>
            {isPlaying ? (
              <RiVolumeUpFill className="text-primary text-xl" />
            ) : (
              <RiVolumeMuteFill className="text-primary text-xl" />
            )}
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center gap-3">
            <p className="font-semibold">Indonesia:</p>
            <p>{props.contohPenggunaanIndo}</p>
          </div>
          <div className="flex items-center gap-3">
            <p className="font-semibold">Sasak:</p>
            <p>{props.contohPenggunaanSasak}</p>
          </div>
        </div>
      </div>
      <div
        className={`${
          path === "/history"
            ? "flex md:flex-col justify-between items-end mt-4 md:mt-0"
            : "hidden"
        }`}>
        <p
          className={`${
            props.status === "active" ? "bg-green-700" : "bg-yellow-400"
          } text-white px-3 py-1 rounded-full text-sm capitalize`}>
          {props.status}
        </p>
        <Dialog
          title="Hapus Kata"
          subtitle={`Apakah anda yakin menghapus kata ${props.sasak}`}
          cancelText="Batal"
          submitText="Hapus"
          onSubmit={() => deleteWord(props.id)}
          onCancel={handleCloseModal}
          onClose={handleCloseModal}
          isLoading={isLoading}
          className={`${!isOpen ? "hidden" : ""}`}>
          <div className="mt-6">
            {message ? (
              message === "Kata berhasil dihapus" ? (
                <SuccessMessage title={message} />
              ) : (
                <ErrorMessage title={message} />
              )
            ) : (
              ""
            )}
          </div>
        </Dialog>
        <button
          type="button"
          // onClick={() => deleteWord(props.id)}
          onClick={handleCloseModal}
          className="flex items-center gap-1 text-red-600 hover:text-red-800">
          <FaRegTrashCan />
          Hapus
        </button>
      </div>
    </div>
  );
}
