"use client";
import { useState, useEffect } from "react";
import { useAlbums } from "@/context/AlbumsContext";

export default function Random() {
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { addFavorite, favorites } = useAlbums();

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

  const isFavorite = album ? favorites.some((fav) => String(fav.id) === String(album.id)) : false;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-950 text-white">
      <main className="flex flex-1 w-full max-w-2xl flex-col items-center justify-center gap-8 py-10 px-8 text-center">
        <h1 className="text-4xl font-bold">Album Aleatorio</h1>

        {loading && (
          <div className="flex items-center justify-center">
              <p className="text-zinc-400">Cargando...</p>
          </div>
        )}

        {album && !loading && (
          <div className="flex flex-col items-center gap-6 bg-zinc-900 p-8 rounded-xl w-full border border-zinc-800">
            {album.cover && (
              <img
                src={album.cover}
                alt={album.title}
                className="w-64 h-64 object-cover rounded border-4 border-zinc-800"
              />
            )}
            
            <div>
                <h2 className="text-2xl mb-1">{album.title}</h2>
                <h3 className="text-sm text-zinc-400">{album.artist}</h3>
                <div className="flex justify-center gap-4 text-sm font-mono text-zinc-400 mt-3">
                    {album.year && <a>AÑO: {album.year}</a>}
                    {album.country && <a>PAÍS: {album.country}</a>}
                </div>
                {album.genre && (
                    <div className="mt-3 flex flex-wrap gap-2 justify-center">
                        {album.genre.map((genre, key) => (
                            <span key={key} className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-300">
                                {genre}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex gap-4 mt-4 w-full">
                <button
                onClick={fetchRandom}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-500 transition-colors disabled:opacity-50 border-2 border-zinc-700"
                >
                🔀 Otro album
                </button>

                <button
                onClick={() => addFavorite(album)}
                disabled={isFavorite}
                className={`flex-1 px-6 py-3 font-medium rounded-full transition-colors ${
                    isFavorite 
                    ? "bg-green-900 text-green-500 border-2 border-green-900 cursor-not-allowed" 
                    : "bg-red-600 text-white hover:bg-red-700 border-2 border-red-800"
                }`}
                >
                {isFavorite ? "En favoritos" : "❤️ Favorito"}
                </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}