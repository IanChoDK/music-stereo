"use client"

import { useState } from "react";
import { useAlbums } from "@/context/AlbumsContext";
import { useRouter } from "next/navigation";

export default function Create() {
    const { addAlbum } = useAlbums()
    const router = useRouter()

    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [year, setYear] = useState("");
    const [cover, setCover] = useState("");
    const [songs, setSongs] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const newAlbum = {
            title,
            artist,
            year,
            cover,
            songs: songs.split(",").map(song => song.trim())
        }

        addAlbum(newAlbum);

        router.push("/albums");
    };

    return (
        <div className="flex flex-col flex-1 items-center py-10 text-white">
            <h1 className="text-3xl font-bold mb-8">
                Create Album
            </h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-full max-w-md text-black"
            >
                <input
                    placeholder="Titulo"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-blue-100 border p-2 rounded"
                    required
                />
                <input
                    placeholder="Artista"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    className="bg-blue-100 border p-2 rounded"
                    required
                />
                <input
                    type="number"
                    placeholder="Año"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="bg-blue-100 border p-2 rounded"
                    required
                />
                <input
                    placeholder="URL portada"
                    value={cover}
                    onChange={(e) => setCover(e.target.value)}
                    className="bg-blue-100 border p-2 rounded"
                    required
                />
                <textarea
                    placeholder="Canciones separadas por coma"
                    value={songs}
                    onChange={(e) => setSongs(e.target.value)}
                    className="bg-blue-100 border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                >
                    Crear album
                </button>
            </form>
        </div>
    );
}