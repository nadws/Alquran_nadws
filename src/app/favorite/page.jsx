"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useState, useEffect } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoMdHeart } from "react-icons/io";
import { TiHeartFullOutline } from "react-icons/ti";
export default function Favorite() {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [favoriteStatus, setFavoriteStatus] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedFavoriteItems = localStorage.getItem("favoriteItems");
    if (storedFavoriteItems) {
      const parsedFavoriteItems = JSON.parse(storedFavoriteItems);
      setFavoriteItems(parsedFavoriteItems);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const removeFromFavorites = (item) => {
    const existingData =
      JSON.parse(localStorage.getItem("favoriteItems")) || [];
    const updatedData = existingData.filter((el) => el.nomor !== item.nomor);
    localStorage.setItem("favoriteItems", JSON.stringify(updatedData));

    // Update favorite status for this specific item
    setFavoriteStatus((prevStatus) => ({
      ...prevStatus,
      [item.nomor]: true, // Set favorite status to false for this item
    }));
  };

  const addToFavorites = (item) => {
    const existingData =
      JSON.parse(localStorage.getItem("favoriteItems")) || [];
    const updatedData = [...existingData, item];
    localStorage.setItem("favoriteItems", JSON.stringify(updatedData));

    // Update favorite status for this specific item
    setFavoriteStatus((prevStatus) => ({
      ...prevStatus,
      [item.nomor]: false, // Set favorite status to true for this item
    }));
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {favoriteItems.length === 0 ? (
            <div className="flex w-full justify-center items-center h-96 p-6">
              <h5 className="text-lg lg:text-4xl text-center">
                Anda belum memiliki daftar surah favorite
              </h5>
            </div>
          ) : (
            <ScrollArea className="h-screen w-full ">
              <div className="grid grid-cols-1 p-3 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
                {favoriteItems
                  .sort((a, b) => parseInt(a.nomor) - parseInt(b.nomor)) // Urutkan berdasarkan nomor surah yang paling muda
                  .map((item, index) => (
                    <Card
                      key={index}
                      className="cursor-pointer rounded-lg  mb-1 lg:mb-0"
                    >
                      <Link
                        href={`/list-surah/${encodeURIComponent(item.nomor)}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="text-1xl rounded-full bg-cyan-100 dark:bg-[#38a482] px-3 py-1">
                              {item.nomor}
                            </div>
                            <div>
                              {/* {favoriteStatus[item.nomor] ? "ada" : "tidak ada"} */}

                              {favoriteStatus[item.nomor] ? (
                                <GoHeart
                                  className="text-2xl lg:text-4xl text-slate-400 cursor-pointer"
                                  onClick={(event) => {
                                    event.preventDefault(); // Menghentikan penyebaran event
                                    addToFavorites(item);
                                  }}
                                />
                              ) : (
                                <GoHeartFill
                                  className="text-2xl lg:text-4xl text-[#38a482] cursor-pointer"
                                  onClick={(event) => {
                                    event.preventDefault();
                                    removeFromFavorites(item, event);
                                  }}
                                />
                              )}
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
          )}
        </>
      )}
    </div>
  );
}
