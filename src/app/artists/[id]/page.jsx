"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import ArtistDetail from "@/app/components/ArtistDetail";

export default function ArtistPage() {
  const { id } = useParams();

  const [artist, setArtist] = useState(null);
  const [artistAlbum, setArtistAlbum] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchArtistData = async () => {
    setLoading(true);

    try {
      const [artistRes, albumsRes] = await Promise.all([
        axios.get(`/api/artist/${id}`),
        axios.get(`/api/artistAlbums/${id}`),
      ]);

      if (!artistRes.data || artistRes.data.error) {
        setArtist(null);
      } else {
        setArtist(artistRes.data);
      }

      if (!albumsRes.data || albumsRes.data.error) {
        setArtistAlbum(null);
      } else {
        setArtistAlbum(albumsRes.data);
      }
    } catch (error) {
      console.error("Error obteniendo datos del artista:", error);
      setArtist(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchArtistData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-1 justify-center items-center min-h-screen text-white">
        <h1 className="text-3xl font-bold animate-pulse">
          Cargando artista...
        </h1>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="flex flex-1 justify-center items-center min-h-screen text-white">
        <h1 className="text-3xl font-bold">Artista no encontrado</h1>
      </div>
    );
  }

  return (
    <main className="flex flex-1 justify-center py-10 px-16">
      <ArtistDetail artist={artist} albums={artistAlbum} />
    </main>
  );
}
