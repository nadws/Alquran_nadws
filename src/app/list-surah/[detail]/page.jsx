"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import { useState, useEffect } from "react";
import { GoBookmark, GoHeart } from "react-icons/go";
import DaftarSurah from "@/components/surah/index";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import Link from "next/link";

const Detail = ({ params }) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://equran.id/api/v2/surat/${params.detail}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [params.detail]);

  if (isLoading) return;
  <p>Loading ...</p>;

  if (!data) return <p>No profile data</p>;

  return (
    <div className="grid grid-cols-1 lg:flex lg:flex-row">
      <div className="lg:w-[30%] w-[100%] lg:mr-5 p-1 lg:p-0">
        <div className="flex  justify-between lg:hidden">
          <div className="py-3">
            {params.detail !== "1" && (
              <Link
                href={`/list-surah/${encodeURIComponent(
                  parseInt(params.detail) - 1
                )}`}
              >
                <FaCaretLeft className="text-2xl text-[#38a482]" />
              </Link>
            )}
          </div>
          <div className="">
            <p className="text-center text-sm font-bold ">
              {data.data.namaLatin}
            </p>
            <p className="text-center text-sm font-normal ">
              {data.data.jumlahAyat} Ayat
            </p>
            <p className="text-center text-sm font-light italic ">
              ({data.data.arti})
            </p>
          </div>
          <div className="py-3">
            {params.detail !== "114" && (
              <Link
                href={`/list-surah/${encodeURIComponent(
                  parseInt(params.detail) + 1
                )}`}
              >
                <FaCaretRight className="text-2xl text-[#38a482]" />
              </Link>
            )}
          </div>
        </div>
        <DaftarSurah params={params.detail} />
      </div>
      <ScrollArea className="h-screen lg:w-[70%] w-[100%]  ">
        {data.data.ayat.map((item) => (
          <div
            key={item.nomorAyat}
            className="grid grid-rows-1 mb-2 bg-background border border-border p-8 rounded-lg"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="text-lg rounded-full bg-cyan-100 dark:bg-[#38a482] px-3 py-1">
                {item.nomorAyat}
              </div>
              <div>
                <GoBookmark className="text-3xl" />
              </div>
            </div>
            <div>
              <div>
                <p className="text-end mb-6 leading-loose lg:leading-loose text-xl lg:text-2xl text-gray-500 dark:text-white font-lpmq">
                  {item.teksArab}
                </p>
                <p className="text-start text-sm lg:text-lg mb-2 text-[#38a482]">
                  {item.teksLatin}
                </p>
                <p className="text-start text-sm lg:text-lg ">
                  {item.teksIndonesia}
                </p>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default Detail;
