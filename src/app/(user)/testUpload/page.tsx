"use client";

import { useState } from "react";
import { analytics } from "@/app/firebase/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

const Page = () => {
  const [file, setFile] = useState<File | null>(null);

  const submit = async (event: any) => {
    event.preventDefault();
    console.log(file);

    const idAudio = uuidv4();

    const audioName = `${idAudio}-${file?.name}`

    if (file) {
      const fileRef = ref(analytics, `kasa-talk-audio/${audioName}`);
      uploadBytes(fileRef, file).then((data) => {
        getDownloadURL(data.ref).then((url) => {
          console.log("url", url);
        });
      });
    } else {
      alert("belum ada file");
    }
  };
  return (
    <div>
      <input
        type="file"
        accept=".mp3"
        onChange={(event: any) => setFile(event.target.files[0])}
      />
      <button onClick={submit}>Submit</button>
    </div>
  );
};

export default Page;
