"use client";
import { useState, useEffect } from "react";
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
    <div>
      {data.data.map((item) => (
        <h1>{item.namaLatin}</h1>
      ))}
    </div>
  );
};
export default ListSurah;
