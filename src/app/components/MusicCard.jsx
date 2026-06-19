"use client";                                                      //actualmente MusicCard era un server component porque no tenia el "use client;", pero cuando apretamos un boton para agregar favoritos, necesitaremos: capturar un click, ejecutar addFavorites(album) y usar el useAlbums(). Y los eventos (onClick) solamente funcionan en client components 

import Link from "next/link"
import { useAlbums } from "@/context/AlbumsContext";            //se importa el hook personalizado del context ¿por que? poque necesitamos acceder a: favorites,addFavorites, removeFavorites, que estan dentro del context 

export default function MusicCard({ album }) {
    const { addFavorite } = useAlbums();                       // react resive favorite, addfavorites, removefavorites

    return (
        <div className="flex flex-col w-full max-w-55 h-[400px] bg-gray-800 rounded-lg p-4 text-center">

            <img
                src={album.cover}
                alt={album.title}
                className="w-full h-56 object-cover rounded-lg"
            />

            <div className="mt-2">
                <h2 className="text-xl font-bold min-h-[60px]">
                    {album.title}
                </h2>

                <p>{album.artist}</p>
            </div>

            <div className="mt-auto flex gap-2">
                <Link
                    href={`/albums/${album.id}`}
                    className="flex-1 bg-gray-200 text-black px-4 py-2 rounded-full hover:bg-gray-500"
                >
                    Details
                </Link>

                <button
                    onClick={() => addFavorite(album)}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700 cursor-pointer"
                >
                    Favorito
                </button>
            </div>

        </div>

    )


}