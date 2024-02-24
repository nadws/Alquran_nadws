"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import { useState, useEffect } from "react";
import { GoBookmark, GoHeart } from "react-icons/go";
import DaftarSurah from "@/components/surah/index";
export default function detail({ params }) {
  const [data, setData] = useState(null);
  // const [dataAyat, setDataAyat] = useState(null);
  const [isLoading, setLoading] = useState(true);
  // const [isLoadingAyat, setLoadingAyat] = useState(true);

  useEffect(() => {
    fetch(`https://equran.id/api/v2/surat/${params.detail}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   fetch("https://equran.id/api/v2/surat")
  //     .then((res) => res.json())
  //     .then((dataAyat) => {
  //       setDataAyat(dataAyat);
  //       setLoadingAyat(false);
  //     });
  // }, []);

  if (isLoading)
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  if (!data) return <p>No profile data</p>;

  return (
    <div className="flex flex-row">
      <div className="w-[30%] hidden lg:block  mr-5">
        {/* <ScrollArea className="h-screen w-full ">
          <div className=" grid grid-cols-1 gap-3">
            {dataAyat &&
              dataAyat.data &&
              dataAyat.data.map((item) => (
                <div
                  className={`cursor-pointer rounded-lg bg-white mb-5 lg:mb-0 ${
                    params.detail == item.nomor ? "active" : ""
                  }`}
                  key={item.nomor}
                >
                  <Link href={`/list-surah/${encodeURIComponent(item.nomor)}`}>
                    <div className="h-36 p-6">
                      <div className="flex justify-between items-center">
                        <div className="text-1xl rounded-full bg-cyan-100 px-3 py-1">
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
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </ScrollArea> */}
        <DaftarSurah params={params.detail} />
      </div>
      <ScrollArea className="h-screen lg:w-[70%] w-[100%]  ">
        {data.data.ayat.map((item) => (
          <div
            key={item.nomorAyat}
            className="grid grid-rows-1 mb-9 bg-white p-8"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="text-lg rounded-full bg-[#ECFDF5] px-3 py-1">
                {item.nomorAyat}
              </div>
              <div>
                <GoBookmark className="text-3xl" />
              </div>
            </div>
            <div className="grid grid-rows-3">
              <div>
                <p className="text-end leading-loose text-2xl text-gray-500 font-lpmq">
                  {item.teksArab}
                </p>
              </div>
              <div className="mt-8">
                <p className="text-lg text-[#38a482]">{item.teksLatin}</p>
              </div>
              <div className="mt-2">
                <p className="text-lg text-black">{item.teksIndonesia}</p>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
