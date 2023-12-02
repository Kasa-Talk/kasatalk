'use client';

import { RiVolumeUpFill, RiVolumeMuteFill } from 'react-icons/ri';
import { useRef, useState } from 'react';

interface Props {
  title: string;
  description: string;
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
        <p className="font-bold ">{props.title}</p>
        <audio src="https://storage.googleapis.com/rinjani-storage/keyboard-153960.mp3" controls ref={audioRef} hidden></audio>
        <button onClick={handlePlayPause}>{isPlaying ? <RiVolumeUpFill className="text-primary text-xl" /> : <RiVolumeMuteFill className="text-primary text-xl" />}</button>
      </div>
      <div>
        <p className="mt-3">{props.description}</p>
      </div>
    </div>
  );
}
