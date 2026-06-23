"use client";
//import { useAlbums } from "@/context/AlbumsContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AlbumDetail from "@/app/components/AlbumDetail";
import axios from "axios";

export default function AlbumPage() {
  // Obtener id
  const { id } = useParams();
  // const { getAlbumById, deleteAlbum } = useAlbums();
  const router = useRouter();
  // Estados para controlar carga y album
  const [Loading, setLoading] = useState(true);
  const [album, setAlbum] = useState(null);

  // Funcion para obtener datos del album
  const fetchAlbum = async () => {
    setLoading(true);

    try {
      // Llamada a la API
      const response = await axios.get(`/api/album/${id}`);
      setAlbum(response.data);
    } catch (error) {
      console.error("Error al obtener informacion sobre el album", error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar informacion del album cada vez que cambia el ID
  useEffect(() => {
    if (id) {
      fetchAlbum();
    }
  }, [id]);

  const handleDelete = () => {
    if (confirm("¿Estás seguro de que quieres eliminar este álbum?")) {
      router.push("/albums");
      setTimeout(() => deleteAlbum(id), 100);
    }
  };

  // Mostrar mensaje de carga
  if (Loading) {
    return (
      <div className="flex flex-1 justify-center items-center text-white min-h-screen">
        <h1 className="text-3xl font-bold animate-pulse">Cargando álbum...</h1>
      </div>
    );
  }

  // Mostrar mensaje de error
  if (!album || album.error) {
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
        onClick={handleDelete}
        className="absolute top-10 right-10 bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-700"
      >
        Eliminar Álbum
      </button>
    </div>
  );
}
