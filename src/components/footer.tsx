import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="flex flex-col md:flex-row max-w-6xl justify-between mx-auto px-4 py-6 gap-8">
        <div>
          <Image
            src={"/asset/logo-white.svg"}
            width={50}
            height={100}
            alt="Logo Kasa Talk"
            // style={{ width: "96px", height: "100%" }}
          />
          <p className="mt-6 max-w-sm">
            Untuk pertanyaan lebih lanjut, silahkan hubungi{" "}
            <a
              href="https://galuhsatria.vercel.app"
              className="font-bold underline">
              admin
            </a>{" "}
            di sini.
          </p>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-3">Kasa Talk</h1>
          <ul className="flex flex-col gap-3">
            <li>
              <Link href={"/"}>Beranda</Link>
            </li>
            <li>
              <Link href={"/kamus"}>Kamus</Link>
            </li>
            <li>
              <Link href={"/kontribusi"}>Kontribusi</Link>
            </li>
            <li>
              <Link href={"/tentang"}>Tentang</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto text-center">
        <div className="h-[1px] w-full bg-white"></div>
        <p className="mt-6 pb-5">© 2023 Kasa Talk. All rights reserved.</p>
      </div>
    </footer>
  );
}
