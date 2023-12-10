"use client";

import { useState } from "react";
import { analytics } from "@/app/firebase/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Page = () => {
  const [file, setFile] = useState(null);

  const submit = async (event: any) => {
    event.preventDefault();
    console.log(file);

    if (file) {
      const fileRef = ref(analytics, `kasa-talk-audio/${file.name}`);
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
