"use client";

import { useAlbums } from "@/context/AlbumsContext";
import { useParams, useRouter } from "next/navigation";
import AlbumDetail from "@/app/components/AlbumDetail";

export default function AlbumPage() {
  const { id } = useParams();
  const { getAlbumById, deleteAlbum } = useAlbums();
  const router = useRouter();

  const album = getAlbumById(id);

  const handleDelete = () => {
    if (confirm("¿Estás seguro de que quieres eliminar este álbum?")) {
      router.push("/albums");
      setTimeout(() => deleteAlbum(id), 100);
    }
  };

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
        onClick={handleDelete}
        className="absolute top-10 right-10 bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-700"
      >
        Eliminar Álbum
      </button>
    </div>
  );
}
