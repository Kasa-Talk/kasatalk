'use client';

import { teams } from '@/contents/content';
import Image from 'next/image';
import Link from 'next/link';
import { RiInstagramLine, RiGithubFill, RiLinkedinBoxFill } from 'react-icons/ri';
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <section>
      <div className="">
        <motion.div
          className="bg-white py-24 border-b"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            duration: 0.5,
          }}
        >
          <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
            <h1 className="text-2xl font-bold">Tentang Kasa Talk</h1>
            <div className="w-28 mt-2 h-[2px] bg-primary"></div>
            <p className="max-w-5xl text-center mt-8 ">
              Kasa Talk merupakan sebuah paltform yang menyediakan kamus bahasa sasak. Menyediakan fitur untuk mencari kata dari bahasa indonesia ke bahasa sasak, anda dapat berkontribusi untuk menambahkan kata yang belum tersedia.
            </p>
            <p className=" max-w-5xl mt-6 text-center">
              Keberadaan Kasa Talk sangatlah penting untuk menjaga kelestarian bahasa Sasak. Dengan adanya kamus ini, pengguna dapat dengan mudah mempelajari bahasa Sasak. Selain itu, pengguna juga dapat berkontribusi untuk melestarikan
              bahasa sasak.
            </p>
          </div>
        </motion.div>

        <div className="mt-12 max-w-6xl px-4 mx-auto ">
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              ease: 'easeInOut',
              duration: 0.5,
            }}
          >
            <h1 className="text-2xl font-bold text-center">Berkenalan dengan Tim Kami</h1>
            <div className="w-28 mt-2 h-[2px] bg-primary"></div>
            <p className="max-w-5xl mt-4 mb-10 text-center">Salah satu alasan Kasa Talk dibuat adalah sebagai project capstone untuk SIB Dicoding dan berikut adalah Tim Kami.</p>
          </motion.div>
          <div className="mt-10 mb-16">
            <ul className="grid lg:grid-cols-2 grid-cols-1 gap-16 lg:max-w-6xl md:max-w-3xl mx-auto">
              {teams.map((team, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    ease: 'easeInOut',
                    duration: 0.5,
                    y: { duration: 0.5 },
                  }}
                  className="flex md:flex-row flex-col gap-6 border-b pb-5 lg:border-none text-center sm:text-left items-center sm:items-start"
                >
                  <div>
                    <Image src={team.imageUrl} width={200} height={200} alt={team.name} className="rounded-xl h-52 object-cover object-top" />
                  </div>
                  <div>
                    <div>
                      <h4 className="text-xl font-bold">{team.name}</h4>
                      <p className=" text-zinc-400">{team.role}</p>
                    </div>
                    <p className="text-lg font-medium mt-4">{team.univesity}</p>
                    <div className="flex gap-3 mt-4 justify-center sm:justify-start">
                      <Link href={team.socialMedia.linkedin} className="text-2xl text-zinc-600 hover:text-blue-900">
                        <RiLinkedinBoxFill />
                      </Link>
                      <Link href={team.socialMedia.instagram} className="text-2xl text-zinc-600 hover:text-red-600">
                        <RiInstagramLine />
                      </Link>
                      <Link href={team.socialMedia.github} className="text-2xl text-zinc-600 hover:text-black">
                        <RiGithubFill />
                      </Link>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
