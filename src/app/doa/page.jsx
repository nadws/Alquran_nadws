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
import { Input } from "@/components/ui/input";

const Doa = ({ params }) => {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://doa-doa-api-ahmadramadhan.fly.dev/api")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data
    ? data.data.filter((item) => {
        const searchTermRegex = new RegExp(
          searchTerm.toLowerCase().split("").join(".*")
        );
        return searchTermRegex.test(item.judul.toLowerCase());
      })
    : [];

  if (isLoading) return <p>Loading ...</p>; // Mengatasi kasus ketika data masih dimuat

  if (!data) return <></>; // Mengatasi kasus ketika data belum tersedia

  return (
    <div className="grid grid-cols-1  ml-4 ">
      <div className=" mt-4 mb-4 flex items-center justify-center">
        <Input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search Doa..."
          className="h-10 border border-slate-400 w-[90%] md:w-[70%] lg:w-[60%]"
        />
      </div>
      <div>
        <ScrollArea className="h-screen  mb-16 ">
          {filteredData.map(
            (
              item,
              index // Menggunakan filteredData yang sudah difilter
            ) => (
              <div
                key={item.doa}
                className="grid grid-rows-1 mb-2 bg-background border border-border p-8 rounded-lg"
              >
                <div className="flex justify-between items-center mb-10">
                  {item.doa}
                </div>
                <div>
                  <div>
                    <p className="text-end mb-6 leading-loose lg:leading-loose text-xl lg:text-2xl text-gray-500 dark:text-white font-lpmq">
                      {item.ayat}
                    </p>
                    <p className="text-start text-sm lg:text-lg mb-2 text-[#38a482]">
                      {item.latin}
                    </p>
                    <p className="text-start text-sm lg:text-lg ">
                      {item.artinya}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Doa;
