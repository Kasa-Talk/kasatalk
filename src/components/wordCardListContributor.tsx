import getBaseURL from "@/libs/getBaseUrl";
import { getCookie } from "cookies-next";

interface Word {
  indonesia: string;
  sasak: string;
  audioUrl: string;
  contohPenggunaanSasak: string;
  contohPenggunaanIndo: string;
}

const fetchKata = async () => {
  try {
    const response = await fetch(getBaseURL("/kata"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
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

const WordCardListContributor = async () => {
  const words = await fetchKata();

  console.log(words);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-primary text-xl font-semibold">
        History Kata yang Pernah Kamu Tambahkan:
      </h1>
    </div>
  );
};

export default WordCardListContributor;
