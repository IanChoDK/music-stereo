"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import ArtistDetail from "@/app/components/ArtistDetail";

export default function ArtistPage() {
  const { id } = useParams();

  const [artist, setArtist] = useState(null);
  const [artistAlbum, setArtistAlbum] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchArtist = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`/api/artist/${id}`);
      const data = await response.data;

      if (!data || data.error) {
        setArtist(null);
        return;
      }

      setArtist(data);
    } catch (error) {
      console.error("Error obteniendo información del artista", error);
      setArtist(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchArtistAlbum = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`/api/artistAlbum/${id}`);
      const data = await response.data;

      if (!data || data.error) {
        setArtistAlbum(null);
        return;
      }

      setArtistAlbum(data);
    } catch (error) {
      console.error("Error obteniendo albums", error);
      setArtistAlbum(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchArtist();
      fetchArtistAlbum();
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
        <h1 className="text-3xl font-bold">
          Artista no encontrado
        </h1>
      </div>
    );
  }

  return (
    <main className="flex flex-1 justify-center py-10 px-16">
      <ArtistDetail artist={artist} albums={artistAlbum} />
    </main>
  );


}