"use client";

import { useAlbums } from "@/context/AlbumsContext";

export default function Notification() {
    const { message } = useAlbums();

    if (!message) {
        return null;
    }

    return (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
            {message}
        </div>
    );
}