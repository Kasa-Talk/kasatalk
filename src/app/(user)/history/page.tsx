import { getCookie, hasCookie } from "cookies-next";
import Image from "next/image";
import { cookies } from "next/headers";
import getBaseURL from "@/libs/getBaseUrl";
import WordCard from "@/components/wordCard";
interface Word {
  indonesia: string;
  sasak: string;
  audioUrl: string;
  contohPenggunaanSasak: string;
  contohPenggunaanIndo: string;
  id: string;
  status: string;
}

const fetchKata = async () => {
  const cookie = getCookie("accessToken", { cookies });
  try {
    const response = await fetch(getBaseURL("/kata"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { data } = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching kata:", error);
  }
};

const Page = async () => {
  const cookie = hasCookie("accessToken", { cookies });
  if (!cookie) {
    return (
      <div className="bg-white max-w-6xl mx-auto p-4 my-6 border rounded-lg text-center">
        <Image
          src="/asset/please-login.png"
          width={500}
          height={500}
          alt=""
          className="mt-5 mx-auto"
        />
        <p className="mt-5 mb-3 text-3xl font-semibold text-gray-900">
          Login dulu yah
        </p>
        <p className="mt-5 mb-5">
          Silahkan login atau membuat akun terlebih dahulu untuk dapat memulai
          berkontribusi
        </p>
      </div>
    );
  }

  const words: Word[] = await fetchKata();

  return (
    <div className="max-w-2xl mx-auto my-8 px-4">
      <h1 className="text-primary text-xl font-semibold text-center mt-4">
        History Kata yang Pernah Kamu Tambahkan:
      </h1>

      {words && words.length > 0 ? (
        words.map((word, index) => (
          <WordCard
            key={index}
            indonesia={word.indonesia}
            sasak={word.sasak}
            audioUrl={word.audioUrl}
            contohPenggunaanIndo={word.contohPenggunaanIndo}
            contohPenggunaanSasak={word.contohPenggunaanSasak}
            isIndonesia={true}
            id={word.id}
            status={word.status}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 mt-4 text-lg">Belum ada kata.</p>
      )}
    </div>
  );
};

export default Page;
