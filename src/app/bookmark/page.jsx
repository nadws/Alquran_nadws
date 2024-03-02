"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";

export default function Bookmark() {
  const [bookMarkItems, setBookMarkItems] = useState([]);
  const [bookMarkStatus, setBookMarkStatus] = useState({});
  const [loading, setLoading] = useState(true);

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

  const removeFromBookMark = (item) => {
    const existingData =
      JSON.parse(localStorage.getItem("bookmarkItems")) || [];
    const updatedData = existingData.filter(
      (el) =>
        el.nomorAyat !== item.nomorAyat || el.nomorSurah !== item.nomorSurah
    );
    localStorage.setItem("bookmarkItems", JSON.stringify(updatedData));

    setBookMarkStatus((prevStatus) => ({
      ...prevStatus,
      [`${item.nomorAyat}_${item.nomorSurah}`]: true,
    }));
  };

  const addToBookMark = (item) => {
    const existingData =
      JSON.parse(localStorage.getItem("bookmarkItems")) || [];
    const updatedData = [...existingData, item];
    localStorage.setItem("bookmarkItems", JSON.stringify(updatedData));

    // Update favorite status for this specific item
    setBookMarkStatus((prevStatus) => ({
      ...prevStatus,
      [`${item.nomorAyat}_${item.nomorSurah}`]: false,
    }));
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {bookMarkItems.length === 0 ? (
            <div className="flex w-full justify-center items-center h-96 p-6">
              <h5 className="text-lg lg:text-4xl text-center">
                Anda belum memiliki daftar bookmark
              </h5>
            </div>
          ) : (
            <ScrollArea className="h-screen w-full ">
              <div className="grid grid-cols-1 p-3 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
                {bookMarkItems.map((item, index) => (
                  <Card
                    key={index}
                    className="cursor-pointer rounded-lg  mb-1 lg:mb-0"
                  >
                    <Link
                      href={`/list-surah/${encodeURIComponent(
                        item.nomorSurah
                      )}/${encodeURIComponent(item.nomorAyat)}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="text-1xl rounded-full bg-cyan-100 dark:bg-[#38a482] px-3 py-1">
                            {item.nomorSurah}
                          </div>
                          <div>
                            {bookMarkStatus[
                              `${item.nomorAyat}_${item.nomorSurah}`
                            ] ? (
                              <FaRegBookmark
                                className="text-2xl lg:text-4xl  cursor-pointer"
                                onClick={(event) => {
                                  event.preventDefault(); // Menghentikan penyebaran event
                                  addToBookMark(item);
                                }}
                              />
                            ) : (
                              <FaBookmark
                                className="text-2xl lg:text-4xl text-[#38a482] cursor-pointer"
                                onClick={(event) => {
                                  event.preventDefault();
                                  removeFromBookMark(item, event);
                                }}
                              />
                            )}
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="font-bold text-sm lg:text-base">
                            {item.namaSurah}
                          </p>
                          <p className="text-sm lg:text-base text-slate-400">
                            Ayat ke {item.nomorAyat}
                          </p>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </>
      )}
    </div>
  );
}
