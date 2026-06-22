"use client"

import { useAlbums } from "@/context/AlbumsContext"
import MusicCard from "./MusicCard"

export default function AlbumsList() {

    const { albums } = useAlbums();

    return (
        <div className="flex flex-row flex-wrap gap-8 justify-center">
            {albums.map((album) => (
                <MusicCard
                    key={album.id}
                    album={album}
                />
            ))}
        </div>
    );
}