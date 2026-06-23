"use client";

import { useAlbums } from "@/context/AlbumsContext";
import FavoriteCard from "../components/FavoriteCard";
import Link from "next/link";

export default function Profile() {
    const { favorites } = useAlbums();

    return (
        <div className="flex flex-col flex-1 items-center bg-zinc-950 text-zinc-100 pb-20">
            <div className="w-full bg-zinc-900 flex justify-center pt-16 pb-12 px-8">
                <div className="w-full flex flex-row items-center gap-8">

                    <div className="w-32 h-32 bg-zinc-800 rounded-lg flex items-center text-center justify-center border-2 border-zinc-700">
                        <a className="text-6xl">🎧</a>
                    </div>
                    
                    <div className="flex flex-col items-center">
                        <h1 className="text-4xl font-bold mb-2">Mi Perfil</h1>
                        
                        <div className="bg-zinc-800 px-6 py-3 rounded border border-zinc-700 flex flex-col items-center">
                            <span className="text-2xl text-white">{favorites.length}</span>
                            <span className="text-xs text-zinc-400">FAVORITOS</span>
                        </div>

                    </div>
                </div>
            </div>

            <main className="flex flex-col w-full max-w-6xl py-12 px-8">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl font-semibold">Tus favoritos</h2>
                </div>

                {favorites.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-zinc-900 rounded-xl border border-zinc-700">
                        <p className="text-zinc-500 text-lg mb-4">
                            OPS... No hay nada aqui
                        </p>
                        <Link href="/random" className="px-6 py-2 bg-zinc-800 rounded hover:bg-zinc-700 transition-colors">
                            Descubrir musica
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-row gap-8 justify-center">
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