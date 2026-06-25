"use client";

import { useParams } from "next/navigation";
import AlbumDetail from "@/app/components/AlbumDetail";
import axios from "axios";
import { useAlbums } from "@/context/AlbumsContext";
import { useEffect, useState } from "react";

export default function AlbumPage() {
  const { id } = useParams();

  const { addFavorite } = useAlbums();

  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(false);

  // Funcion para obtener datos de un album
  const fetchAlbum = async () => {
    setLoading(true);

    try {
      // Llamada a la Api de album
      const response = await axios.get(`/api/album/${id}`);
      const data = await response.data;

      // Manejar falta de datos o error
      if (!data || data.error) {
        setAlbum(null);
        return;
      }

      // Guardar album formateado
      setAlbum(data);
    } catch (error) {
      console.log("Error obteniendo informacion del album", error);
    } finally {
      setLoading(false);
    }
  };

  // Recargar data al modificar el id
  useEffect(() => {
    if (id) {
      fetchAlbum();
    }
  }, [id]);

  // Funcion para agregar album a lista de favoritos
  const handleAddFavorite = () => {
    if (!album) return;

    addFavorite({
      id: album.id,
      title: album.title,
      artist: album.artist,
      cover: album.cover,
      year: album.year,
    });
  };

  // Mostrar mensaje de carga
  if (loading) {
    return (
      <div className="flex flex-1 justify-center items-center text-white min-h-screen">
        <h1 className="text-3xl font-bold animate-pulse">Cargando álbum...</h1>
      </div>
    );
  }

  // Mensaje si no se encuentra el album
  if (!album) {
    return (
      <div className="flex flex-1 justify-center items-center text-white">
        <h1 className="text-3xl font-bold">Álbum no encontrado</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center relative text-white">
      <main className="flex flex-1 w-full flex-col items-center justify-between py-10 px-16">
        <AlbumDetail album={album} />
      </main>

      <button
        onClick={handleAddFavorite}
        className="absolute top-10 right-10 bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-700"
      >
        Agregar a favoritos
      </button>
    </div>
  );
}
