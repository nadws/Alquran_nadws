"use client";
import { Card, CardContent } from "@/components/ui/card";
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

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div className="grid grid-cols-4 gap-5">
      {data.data.map((item) => (
        <div className="cursor-pointer rounded-lg bg-white">
          <div className="h-36 p-6">
            <div className="flex justify-between items-center">
              <div className="text-1xl rounded-full bg-cyan-100 px-3 py-1">
                {item.nomor}
              </div>
              <div>
                <GoHeart className="text-4xl" />
              </div>
            </div>
            <div className="py-6 ">
              <h6 className="font-bold">{item.namaLatin}</h6>
              <p>{item.arti}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ListSurah;
