"use client";

import { benefitUse, people, faqs, fitur } from "@/contents/content";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion } from "framer-motion";
import getBaseURL from "@/libs/getBaseUrl";

export default function Page() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [topContributor, setTopContributor] = useState([]);

  const toggleFaq = (index: any) => {
    setActiveFaq((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const fetchTopContributor = async () => {
      try {
        const response = await fetch(getBaseURL("/kata/top-contributor?limit=5"));

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const { data } = await response.json();
        console.log(data);
        setTopContributor(data);
      } catch (error) {
        console.error("Error fetching top contributor:", error);
      }
    };
    fetchTopContributor();
  }, []);

  return (
    <main>
      <section className="hero flex justify-between flex-col md:flex-row items-center mt-20 gap-10 max-w-6xl mx-auto px-4">
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold md:leading-normal lg:leading-normal">
            Jelajahi Bahasa Sasak Dengan{" "}
            <span className="text-primary">Kasa Talk</span>
          </h1>
          <button className="btn px-12 py-3 mt-10">
            <Link href={"/kamus"}>Telusuri Sekarang</Link>
          </button>
        </div>
        <div className=" flex md:justify-end justify-center">
          <Image
            src={"/asset/hero-ilustration.svg"}
            width={400}
            height={360}
            alt="hero-image"
          />
        </div>
      </section>

      <section className="bg-primary">
        <div className="flex justify-end">
          <Image
            src={"/asset/batik-icon.svg"}
            width={600}
            height={100}
            alt="batik-image"
          />
        </div>
        <div className="flex md:flex-row justify-between flex-col-reverse md:gap-0 gap-20 items-center max-w-6xl mx-auto px-4 py-8 ">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              ease: "easeInOut",
              duration: 0.5,
              y: { duration: 0.5 },
            }}>
            <Image
              src={"/asset/fitur-ilustration.svg"}
              width={400}
              height={800}
              alt="fitur-image"
            />
          </motion.div>
          <div className="fitur">
            <motion.ul
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
                y: { duration: 0.5 },
              }}
              className="flex flex-col gap-8">
              {fitur.map(({ name, icon }) => (
                <li className="flex items-center gap-4" key={name}>
                  <div className="bg-white px-3 py-2 text-2xl rounded-md">
                    {icon}
                  </div>
                  <p className="text-xl text-white font-medium">{name}</p>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div>
          <motion.div
            className="text-center flex flex-col items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              ease: "easeInOut",
              duration: 0.5,
            }}>
            <h1 className="sm:text-2xl font-semibold px-4 text-xl ">
              Kenapa Mengunakan Kasa Talk?
            </h1>
            <div className="w-28 mt-2 h-[2px] bg-primary"></div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto md:gap-6 px-4 mt-14 mb-16">
            {benefitUse.map(({ name, description }, index) => (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.5,
                  y: { duration: 0.5 },
                }}
                className="p-5 rounded-md bg-white shadow-sm border"
                key={name}>
                <h2 className="font-semibold text-xl">{name}</h2>
                <p className="text-slate-600 mt-3">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border border-b border-t">
        <div>
          <motion.div
            className="text-center flex flex-col items-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              ease: "easeInOut",
              duration: 0.5,
            }}>
            <h1 className="sm:text-2xl font-semibold px-4 text-xl ">
              Peringkat Kontributor
            </h1>
            <div className="w-28 mt-2 h-[2px] bg-primary"></div>
          </motion.div>
          <div className="max-w-4xl mx-auto py-6 mt-8 px-2">
            <ul className="flex flex-col gap-6 mx-auto p-5">
              {topContributor?.map(({ name, total, avatarUrl }, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.5,
                    y: { duration: 0.5 },
                  }}>
                  <div className="flex justify-between items-center border-b pb-2">
                    <div className="flex gap-4 items-center">
                      <Image
                        src={avatarUrl}
                        width={200}
                        height={200}
                        alt={name}
                        className="rounded-full aspect-square object-cover h-14 w-14"
                      />
                      <p className="font-semibold">{name}</p>
                    </div>
                    <p className="text-primary font-semibold capitalize">{total}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
          <motion.div
            className="text-center max-w-3xl mx-auto pb-6 px-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              ease: "easeInOut",
              duration: 0.5,
            }}>
            <p className="text-sm md:text-base">
              Bergabung dan jadilah kontributor untuk menambahkan kata-kata yang
              berlum tersedia dan dapatkan hadiah istimewa.{" "}
              <Link href="/login" className="text-primary underline">
                Bergabung
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      <section>
        <div className="text-center flex flex-col items-center mt-16">
          <h1 className="sm:text-2xl font-semibold px-4 text-xl ">
            Frequently Asked Questions
          </h1>
          <div className="w-28 mt-2 h-[2px] bg-primary"></div>
        </div>
        <ul className="max-w-6xl mx-auto flex flex-col gap-4 px-4 mb-16 mt-14">
          {faqs.map(({ question, answer }, index) => (
            <motion.li
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
                y: { duration: 0.5 },
              }}
              key={index}
              className="faq-item bg-white p-4 rounded-md border cursor-pointer">
              <div
                className="faq-question flex justify-between"
                onClick={() => toggleFaq(index)}>
                <h3 className="font-semibold text-lg">{question}</h3>
                <span className="cursor-pointer text-2xl">
                  {activeFaq === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
              </div>
              {activeFaq === index && (
                <div className="faq-answer">
                  <p className="mt-4">{answer}</p>
                </div>
              )}
            </motion.li>
          ))}
        </ul>
      </section>
    </main>
  );
}
