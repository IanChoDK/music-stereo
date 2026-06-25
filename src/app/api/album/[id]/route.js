import { NextResponse } from "next/server";

export async function GET(request, context) {
  // Obtener el ID del album desde los parámetros de la ruta
  const params = await context.params;
  const id = params.id;

  // Validar ID
  if (!id) {
    return NextResponse.json(
      { error: "Falta el ID del album" },
      { status: 400 },
    );
  }

  // Llamada a la API de Discogs
  try {
    const response = await fetch(`https://api.discogs.com/masters/${id}`, {
      headers: {
        // Variables de entorno para autenticacion
        Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`,
        "User-Agent": process.env.DISCOGS_USER_AGENT,
      },
    });

    // Manejar errores de la API
    if (!response.ok) {
      return NextResponse.json(
        { error: "Error obteniendo los detalles del album" },
        { status: 404 },
      );
    }

    // Devolver datos formateados
    const data = await response.json();

    const formattedAlbum = {
      id: data.id,
      title: data.title || "Título Desconocido",
      year: data.year || "Año Desconocido",
      artist:
        data.artists && data.artists.length > 0
          ? data.artists[0].name
          : "Artista Desconocido",
      cover:
        data.images && data.images.length > 0
          ? data.images[0].uri
          : "https://via.placeholder.com/300?text=Sin+Portada",
      songs:
        data.tracklist && data.tracklist.length > 0
          ? data.tracklist.map((track) => track.title)
          : ["Lista de canciones no disponible"],
    };

    return NextResponse.json(formattedAlbum);
  } catch (error) {
    // Mostrar error
    console.error("Error obteniendo los detalles del album: ", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
