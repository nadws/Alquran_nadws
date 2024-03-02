"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import { useState, useEffect } from "react";
import { GoBookmark, GoBookmarkFill, GoHeart } from "react-icons/go";
import DaftarSurah from "@/components/surah/index";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaBookmark, FaPlay, FaRegBookmark } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import ReactPlayer from "react-player";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { FiPlay } from "react-icons/fi";

const Doa = ({ params }) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.dikiotang.com/doa")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return;
  <p>Loading ...</p>;

  if (!data) return <></>;

  return (
    <div className="grid grid-cols-1 lg:flex lg:flex-row ml-4">
      <ScrollArea className="h-screen  w-[100%] mb-16 ">
        {data.data.map((item, index) => (
          <div
            key={item.judul}
            className="grid grid-rows-1 mb-2 bg-background border border-border p-8 rounded-lg"
          >
            <div className="flex justify-between items-center mb-10">
              {item.judul}
            </div>
            <div>
              <div>
                <p className="text-end mb-6 leading-loose lg:leading-loose text-xl lg:text-2xl text-gray-500 dark:text-white font-lpmq">
                  {item.arab}
                </p>
                <p className="text-start text-sm lg:text-lg mb-2 text-[#38a482]">
                  {item.indo}
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

export default Doa;
