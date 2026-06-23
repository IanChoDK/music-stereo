import { NextResponse } from "next/server";

const GENRES = ["rock", "jazz", "pop", "electronic", "hip-hop", "classical", "metal", "blues"];

export async function GET() {
  const genre = GENRES[Math.floor(Math.random() * GENRES.length)];
  const randomPage = Math.floor(Math.random() * 10) + 1;

  try {
    const response = await fetch(
      `https://api.discogs.com/database/search?genre=${genre}&type=release&per_page=10&page=${randomPage}`,
      {
        headers: {
          Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`,
          "User-Agent": process.env.DISCOGS_USER_AGENT,
        },
      }
    );

    const data = await response.json();
    const results = data.results;

    if (!results || results.length === 0) {
      return NextResponse.json({ error: "No se encontraron resultados" }, { status: 404 });
    }

    const random = results[Math.floor(Math.random() * results.length)];

    const songsResponse = await fetch(
      `https://api.discogs.com/releases/${random.id}`,
      {
        headers: {
            Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`,
            "User-Agent": process.env.DISCOGS_USER_AGENT,
        },
      }
    );

    if (!songsResponse.ok) {
      return NextResponse.json({ error: "No se encontraron resultados de canciones" }, { status: 404 })
    }

    const songsData = await songsResponse.json();

    const titleParts = random.title.split(" - ");
    const artistName = titleParts.length > 1 ? titleParts[0] : "Desconocido";
    const albumTitle = titleParts.length > 1 ? titleParts[1] : random.title;

    const formattedAlbum = {
      id: songsData.id,
      title: albumTitle,
      artist: artistName,
      year: songsData.year || "Desconocido",
      cover: random.cover_image || "No hay imagen de album",
      songs: songsData.tracklist ? songsData.tracklist.map(track => track.title) : [],
      genre: random.genre,
      country: random.country,
    };

    return NextResponse.json(formattedAlbum);
  } catch (error) {
    console.error("Error obteniendo album aleatorio:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}