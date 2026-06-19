"use client";

import { useAlbums } from "@/context/AlbumsContext";
import Link from "next/link";

export default function FavoriteCard({ album }) {

    const { removeFavorite } = useAlbums();

    return (
        <div className="flex flex-col w-full max-w-55 h-[400px] bg-gray-800 rounded-lg p-4 text-center">

            <img
                src={album.cover}
                alt={album.title}
                className="w-full h-56 object-cover rounded-lg"
            />

            <h2 className="text-xl font-bold mt-4">
                {album.title}
            </h2>

            <p>
                {album.artist}
            </p>

            <div className="flex gap-2 mt-auto justify-center">

                <Link
                    href={`/albums/${album.id}`}
                    className="bg-gray-200 text-black px-4 py-2 rounded-full hover:bg-gray-400 cursor-pointer"
                >
                    Details
                </Link>

                <button
                    onClick={() => removeFavorite(album.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700 cursor-pointer"
                >
                    Quitar
                </button>

            </div>

        </div>
    );
}