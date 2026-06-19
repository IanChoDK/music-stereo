"use client";

import { useAlbums } from "@/context/AlbumsContext";
import FavoriteCard from "../components/FavoriteCard";

export default function Profile() {
    const { favorites } = useAlbums();

    return (
        <div className="flex flex-col flex-1 items-center justify-center">
            <main className="flex flex-1 w-full max-w-6xl flex-col items-center py-16 px-16">
                <h1 className="text-3xl font-semibold mb-8">
                    Profile
                </h1>

                <h2 className="text-xl">
                    Favoritos: {favorites.length}
                </h2>

                {favorites.length === 0 ? (
                    <p className="text-gray-400 text-lg mt-8">
                        No hay álbumes favoritos todavía
                    </p>
                ) : (
                    <div className="flex flex-row flex-wrap gap-8 justify-center">
                        {favorites.map((album) => (
                            <FavoriteCard
                                key={album.id}
                                album={album}
                            />
                        ))}
                    </div>
                )}

            </main>
        </div>
    );
}