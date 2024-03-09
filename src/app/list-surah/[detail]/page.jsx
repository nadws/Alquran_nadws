"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import { useState, useEffect } from "react";
import { GoBookmark, GoBookmarkFill, GoHeart } from "react-icons/go";
import DaftarSurah from "@/components/surah/index";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FaBookmark,
  FaPauseCircle,
  FaPlay,
  FaPlayCircle,
  FaRegBookmark,
} from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import ReactPlayer from "react-player";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { FiPlay } from "react-icons/fi";

const Detail = ({ params }) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [bookMarkItems, setBookMarkItems] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(null);

  useEffect(() => {
    fetch(`https://equran.id/api/v2/surat/${params.detail}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [params.detail]);

  useEffect(() => {
    const storedBookMarkItems = localStorage.getItem("bookmarkItems");
    if (storedBookMarkItems) {
      const parsedBookMarkItems = JSON.parse(storedBookMarkItems);
      setBookMarkItems(parsedBookMarkItems);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const handleCloseDrawer = () => {
    setPlayingIndex(null);
  };

  if (isLoading) return;
  <p>Loading ...</p>;

  if (!data) return <></>;

  const handleBookMarktClick = (item, event) => {
    const isItemInBookMark = bookMarkItems.some(
      (bookMarkItem) =>
        bookMarkItem.nomorAyat === item.nomorAyat &&
        bookMarkItem.nomorSurah === item.nomorSurah
    );
    if (!isItemInBookMark) {
      const itemWithSurahInfo = {
        namaSurah: data.data.namaLatin,
        nomorSurah: params.detail,
        ...item, // atau cara Anda mendapatkan nomor surah
      };
      const updatedBookMarkItems = [...bookMarkItems, itemWithSurahInfo];
      localStorage.setItem(
        "bookmarkItems",
        JSON.stringify(updatedBookMarkItems)
      );
      setBookMarkItems(updatedBookMarkItems);
    }
  };

  const removeFromBookMark = (item) => {
    const existingData =
      JSON.parse(localStorage.getItem("bookmarkItems")) || [];
    const updatedData = existingData.filter(
      (el) => el.nomorAyat !== item.nomorAyat || el.nomorSurah !== params.detail
    );

    setBookMarkItems(updatedData);
    localStorage.setItem("bookmarkItems", JSON.stringify(updatedData));
  };

  return (
    <div className="grid grid-cols-1 lg:flex lg:flex-row ml-4">
      <div className="lg:w-[30%] w-[100%] lg:mr-5 p-1 lg:p-0">
        <DaftarSurah
          params={params.detail}
          namaLatin={data.data.namaLatin}
          jumlahAyat={data.data.jumlahAyat}
          arti={data.data.arti}
        />
      </div>
      <ScrollArea className="h-screen lg:w-[70%] w-[100%] mb-16 ">
        {data.data.ayat.map((item, index) => (
          <div
            key={item.nomorAyat}
            className="grid grid-rows-1 mb-2 bg-background border border-border p-8 rounded-lg"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="text-lg rounded-full bg-cyan-100 dark:bg-[#38a482] px-3 py-1">
                {item.nomorAyat}
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div>
                  {bookMarkItems.some(
                    (bookMarkItem) =>
                      bookMarkItem.nomorAyat === item.nomorAyat &&
                      bookMarkItem.nomorSurah === params.detail
                  ) ? (
                    <FaBookmark
                      className="text-3xl cursor-pointer text-[#38a482]"
                      onClick={(event) => {
                        event.preventDefault();
                        removeFromBookMark(item, event);
                      }}
                    />
                  ) : (
                    <FaRegBookmark
                      className="text-3xl cursor-pointer"
                      onClick={(event) => {
                        event.preventDefault();
                        handleBookMarktClick(item, event);
                      }}
                    />
                  )}
                </div>
                <div>
                  <Drawer onClose={handleCloseDrawer}>
                    <DrawerTrigger asChild>
                      {playingIndex === index ? (
                        <FaPauseCircle className="text-3xl text-[#38a482]" />
                      ) : (
                        <FaPlayCircle
                          className="text-3xl cursor-pointer text-[#38a482]"
                          onClick={() => setPlayingIndex(index)}
                        />
                      )}
                    </DrawerTrigger>
                    <DrawerContent>
                      <ReactPlayer
                        url={item.audio["05"]}
                        controls
                        width={1500}
                        height={60}
                        playing={playingIndex === index}
                        onEnded={() => setPlayingIndex(null)}
                      />
                    </DrawerContent>
                  </Drawer>
                </div>
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
