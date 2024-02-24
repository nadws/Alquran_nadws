"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import { useState, useEffect } from "react";
import { GoBookmark, GoHeart } from "react-icons/go";
import DaftarSurah from "@/components/surah/index";

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
        <DaftarSurah params={params.detail} />
      </div>
      <ScrollArea className="h-screen lg:w-[70%] w-[100%]  ">
        {data.data.ayat.map((item, index) => (
          <div key={index} className="grid grid-rows-1 mb-9 bg-white p-8">
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
};

export default Detail;
