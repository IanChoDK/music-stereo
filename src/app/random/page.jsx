"use client";
import { useState, useEffect } from "react";

export default function Random() {
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRandom = async () => {
    setLoading(true);
    setAlbum(null);
    try {
      const res = await fetch("/api/random");
      const data = await res.json();
      setAlbum(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandom();
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-950 text-white">
      <main className="flex flex-1 w-full max-w-2xl flex-col items-center justify-center gap-8 py-20 px-8 text-center">
        <h1 className="text-4xl font-bold">Album Aleatorio</h1>

        {loading && (
          <p className="text-zinc-400 text-lg animate-pulse">Buscando album...</p>
        )}

        {album && !loading && (
          <div className="flex flex-col items-center gap-4 bg-gray-800 p-8 rounded-2xl w-full">
            {album.cover_image && (
              <img
                src={album.cover_image}
                alt={album.title}
                className="w-60 h-60 object-cover rounded-xl shadow-lg"
              />
            )}
            <h2 className="text-2xl font-bold">{album.title}</h2>
            {album.year && <p className="text-zinc-400">Año: {album.year}</p>}
            {album.genre && (
              <p className="text-zinc-400">Género: {album.genre.join(", ")}</p>
            )}
            {album.country && (
              <p className="text-zinc-400">País: {album.country}</p>
            )}
          </div>
        )}

        <button
          onClick={fetchRandom}
          disabled={loading}
          className="px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-500 transition-colors disabled:opacity-50"
        >
          🔀 Otro album
        </button>
      </main>
    </div>
  );
}