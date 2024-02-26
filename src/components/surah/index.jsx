"use client";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GoHeart } from "react-icons/go";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

export default function DaftarSurah({ params, namaLatin, jumlahAyat, arti }) {
  const [dataAyat, setDataAyat] = useState(null);
  const [isLoadingAyat, setLoadingAyat] = useState(true);
  useEffect(() => {
    fetch("https://equran.id/api/v2/surat")
      .then((res) => res.json())
      .then((dataAyat) => {
        setDataAyat(dataAyat);
        setLoadingAyat(false);
      });
  }, []);

  return (
    <>
      <div className="flex  justify-between lg:hidden">
        <div className="py-3">
          {params !== "1" && (
            <Link
              href={`/list-surah/${encodeURIComponent(parseInt(params) - 1)}`}
            >
              <FaCaretLeft className="text-2xl text-[#38a482]" />
            </Link>
          )}
        </div>
        <div className="">
          <p className="text-center text-sm font-bold ">{namaLatin}</p>
          <p className="text-center text-sm font-normal ">{jumlahAyat} Ayat</p>
          <p className="text-center text-sm font-light italic ">({arti})</p>
        </div>
        <div className="py-3">
          {params !== "114" && (
            <Link
              href={`/list-surah/${encodeURIComponent(parseInt(params) + 1)}`}
            >
              <FaCaretRight className="text-2xl text-[#38a482]" />
            </Link>
          )}
        </div>
      </div>
      <ScrollArea className="h-screen w-full hidden lg:block">
        <div className=" grid grid-cols-1 gap-3">
          {dataAyat &&
            dataAyat.data &&
            dataAyat.data.map((item) => (
              <Card
                className={`cursor-pointer rounded-lg  mb-5 lg:mb-0 ${
                  params == item.nomor ? "active" : ""
                }`}
                key={item.nomor}
              >
                <Link href={`/list-surah/${encodeURIComponent(item.nomor)}`}>
                  <CardContent className="h-36 p-6">
                    <div className="flex justify-between items-center">
                      <div className="text-1xl rounded-full bg-cyan-100 dark:bg-[#38a482]  px-3 py-1">
                        {item.nomor}
                      </div>
                      <div>
                        <GoHeart className="text-4xl" />
                      </div>
                    </div>
                    <div className="py-6 ">
                      <h6 className="font-bold">{item.namaLatin}</h6>
                      <p>{item.arti}</p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
        </div>
      </ScrollArea>
    </>
  );
}
