import { NextResponse } from "next/server";

export async function GET(request, context) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json(
      { error: "Falta el ID del artista" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.discogs.com/artists/${id}/releases`,
      {
        headers: {
          Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`,
          "User-Agent": process.env.DISCOGS_USER_AGENT,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Error obteniendo los álbumes" },
        { status: response.status }
      );
    }

    const data = await response.json();

    const albums = data.releases
      .filter(
        (release) =>
          release.type === "master" &&
          release.role === "Main"
      )
      .map((release) => ({
        id: release.id,
        title: release.title,
        year: release.year,
        cover:
          release.thumb ||
          "https://via.placeholder.com/300?text=Sin+Portada",
      }));

    return NextResponse.json(albums);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}