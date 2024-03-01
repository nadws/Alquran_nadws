"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import { useState, useEffect } from "react";
import { GoBookmark, GoBookmarkFill, GoHeart } from "react-icons/go";
import DaftarSurah from "@/components/surah/index";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Detail = ({ params }) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [bookMarkItems, setBookMarkItems] = useState([]);

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

  if (isLoading) return;
  <p>Loading ...</p>;

  if (!data) return <p>No profile data</p>;

  const handleBookMarktClick = (item, event) => {
    const isItemInBookMark = bookMarkItems.some(
      (bookMarkItem) =>
        bookMarkItem.nomorAyat === item.nomorAyat &&
        bookMarkItem.nomorSurah === item.nomorSurah
    );
    if (!isItemInBookMark) {
      const itemWithSurahInfo = {
        namaSurah: data.data.nama,
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
      (el) => el.nomorAyat !== item.nomorAyat || el.namaSurah !== item.namaSurah
    );

    setBookMarkItems(updatedData);
    localStorage.setItem("bookmarkItems", JSON.stringify(updatedData));
  };

  return (
    <div className="grid grid-cols-1 lg:flex lg:flex-row">
      <div className="lg:w-[30%] w-[100%] lg:mr-5 p-1 lg:p-0">
        <DaftarSurah
          params={params.detail}
          namaLatin={data.data.namaLatin}
          jumlahAyat={data.data.jumlahAyat}
          arti={data.data.arti}
        />
      </div>
      <ScrollArea className="h-screen lg:w-[70%] w-[100%] mb-16 ">
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
                {bookMarkItems.some(
                  (bookMarkItem) =>
                    bookMarkItem.nomorAyat === item.nomorAyat &&
                    bookMarkItem.nomorSurah === params.detail
                ) ? (
                  <GoBookmarkFill
                    className="text-3xl cursor-pointer text-[#38a482]"
                    onClick={(event) => {
                      event.preventDefault();
                      removeFromBookMark(item, event);
                    }}
                  />
                ) : (
                  <GoBookmark
                    className="text-3xl cursor-pointer"
                    onClick={(event) => {
                      event.preventDefault();
                      handleBookMarktClick(item, event);
                    }}
                  />
                )}
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
