"use client";

import { Card, CardContent } from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import Loading from "@/app/list-surah/loading";
import { Input } from "@/components/ui/input";
import { IoMdHeart } from "react-icons/io";
import { TiHeartFullOutline } from "react-icons/ti";
const ListSurah = ({}) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    fetch("https://equran.id/api/v2/surat")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

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

  const handleHeartClick = (item, event) => {
    const isItemInFavorites = favoriteItems.some(
      (favoriteItem) => favoriteItem.nomor === item.nomor
    );
    if (!isItemInFavorites) {
      const updatedFavoriteItems = [...favoriteItems, item];
      localStorage.setItem(
        "favoriteItems",
        JSON.stringify(updatedFavoriteItems)
      );
      setFavoriteItems(updatedFavoriteItems);
    }
  };
  const removeFromFavorites = (item) => {
    const existingData =
      JSON.parse(localStorage.getItem("favoriteItems")) || [];
    const updatedData = existingData.filter((el) => el.nomor !== item.nomor);

    setFavoriteItems(updatedData);
    localStorage.setItem("favoriteItems", JSON.stringify(updatedData));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data
    ? data.data.filter((item) => {
        const searchTermRegex = new RegExp(
          searchTerm.toLowerCase().split("").join(".*")
        );
        return searchTermRegex.test(item.namaLatin.toLowerCase());
      })
    : [];

  // if (isLoading) return <p>loading ..</p>;
  if (!data) return null;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="flex items-center justify-center mt-4 mb-4">
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search surah..."
            className="h-10 border border-slate-400 w-[90%] md:w-[70%] lg:w-[60%]"
          />
        </div>
        <ScrollArea className="h-screen w-full mb-14">
          <div className=" grid grid-cols-1 p-3 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {filteredData.map((item) => (
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
                        {favoriteItems.some(
                          (favoriteItem) => favoriteItem.nomor === item.nomor
                        ) ? (
                          <GoHeartFill
                            className="text-2xl lg:text-4xl text-[#38a482] cursor-pointer"
                            onClick={(event) => {
                              event.preventDefault();
                              removeFromFavorites(item, event);
                            }}
                          />
                        ) : (
                          <GoHeart
                            className="text-2xl lg:text-4xl text-slate-400 cursor-pointer"
                            onClick={(event) => {
                              event.preventDefault(); // Menghentikan penyebaran event
                              handleHeartClick(item, event);
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
      </Suspense>
    </>
  );
};
export default ListSurah;
