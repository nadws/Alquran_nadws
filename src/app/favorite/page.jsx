"use client";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useState, useEffect } from "react";
import { GoHeart } from "react-icons/go";
import { IoMdHeart } from "react-icons/io";
export default function Favorite() {
  const [favoriteItems, setFavoriteItems] = useState([]);
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

    const index = existingData.findIndex((el) => el.id === item.id);

    if (index !== -1) {
      existingData.splice(index, 1);
      setFavoriteItems(existingData);
      localStorage.setItem("favoriteItems", JSON.stringify(existingData));
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className=" grid grid-cols-1 p-3 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {favoriteItems.map((item, index) => (
            <Card
              key={index}
              className="cursor-pointer rounded-lg  mb-1 lg:mb-0"
            >
              <Link href={`/list-surah/${encodeURIComponent(item.nomor)}`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="text-1xl rounded-full bg-cyan-100 dark:bg-[#38a482] px-3 py-1">
                      {item.nomor}
                    </div>
                    <div>
                      <IoMdHeart
                        className="text-2xl lg:text-4xl text-[#38a482] cursor-pointer"
                        onClick={(event) => {
                          event.preventDefault(); // Menghentikan penyebaran event
                          removeFromFavorites(item);
                        }}
                      />
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
        // <ul>
        //   {favoriteItems.map((item, index) => (
        //     <li key={index}>{item.nama}</li>
        //   ))}
        // </ul>
      )}
    </div>
  );
}
