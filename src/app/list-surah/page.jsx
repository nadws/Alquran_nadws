"use client";

import { Card, CardContent } from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useState, useEffect } from "react";
import { GoHeart } from "react-icons/go";
const ListSurah = ({}) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://equran.id/api/v2/surat")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

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
    <>
      <ScrollArea className="h-screen w-full ">
        <div className=" grid grid-cols-1 p-3 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {data.data.map((item) => (
            <Card
              key={item.nomor}
              className="cursor-pointer rounded-lg  mb-1 lg:mb-0"
            >
              <Link href={`/list-surah/${encodeURIComponent(item.nomor)}`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="text-1xl rounded-full bg-cyan-100 dark:bg-[#38a482] px-3 py-1">
                      {item.nomor}
                    </div>
                    <div>
                      <GoHeart className="text-2xl lg:text-4xl text-slate-400" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="font-bold text-sm lg:text-base">
                      {item.namaLatin}
                    </p>
                    <p className="text-sm lg:text-base">{item.arti}</p>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </>
  );
};
export default ListSurah;
