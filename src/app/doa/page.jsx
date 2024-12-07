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

const Doa = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://doa-doa-api-ahmadramadhan.fly.dev/api"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFilteredData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && filteredData.length === 0 && (
        <p>Data tidak ditemukan</p>
      )}
      {!loading && !error && filteredData.length > 0 && (
        <div>
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="grid grid-rows-1 mb-2 bg-background border border-border p-8 rounded-lg"
            >
              <div className="flex justify-between items-center mb-10">
                {item.doa}
              </div>
              <div>
                <p className="text-end mb-6 leading-loose lg:leading-loose text-xl lg:text-2xl text-gray-500 dark:text-white font-lpmq">
                  {item.ayat}
                </p>
                <p className="text-start text-sm lg:text-lg mb-2 text-[#38a482]">
                  {item.latin}
                </p>
                <p className="text-start text-sm lg:text-lg ">{item.artinya}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Doa;
