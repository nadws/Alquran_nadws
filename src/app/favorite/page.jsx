"use client";
import { useState, useEffect } from "react";
export default function Favorite() {
  // Inisialisasi state untuk menyimpan data favorit
  const [favoriteItems, setFavoriteItems] = useState([]);
  // Inisialisasi state untuk menyimpan loading state
  const [loading, setLoading] = useState(true);

  // Gunakan useEffect untuk memuat data dari local storage saat komponen dimuat
  useEffect(() => {
    // Ambil data favorit dari local storage
    const storedFavoriteItems = localStorage.getItem("favoriteItems");
    if (storedFavoriteItems) {
      // Jika ada data favorit, ubah dari string JSON ke objek JavaScript
      const parsedFavoriteItems = JSON.parse(storedFavoriteItems);
      // Set state favoriteItems dengan nilai yang diambil dari local storage
      setFavoriteItems(parsedFavoriteItems);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      {/* Tampilkan data favorit */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {favoriteItems.map((item, index) => (
            <li key={index}>{item.nama}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
