'use client';

import { RiVolumeUpFill, RiVolumeMuteFill } from 'react-icons/ri';
import { useRef, useState } from 'react';

interface Props {
  indonesia: string;
  sasak: string;
  audioUrl: string;
  contohPenggunaanSasak: string;
  contohPenggunaanIndo: string;
  isIndonesia: boolean;
}

export default function WordCard(props: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <div className="bg-white rounded-md border p-4 max-w-4xl mx-auto mt-5">
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
        <audio src={props.audioUrl} controls ref={audioRef} hidden></audio>
        <button onClick={handlePlayPause}>{isPlaying ? <RiVolumeUpFill className="text-primary text-xl" /> : <RiVolumeMuteFill className="text-primary text-xl" />}</button>
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
  );
}
