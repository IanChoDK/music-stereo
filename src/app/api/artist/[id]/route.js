import { NextResponse } from "next/server";

export async function GET(request, context) {
  // Obtener el ID del album desde los parámetros de la ruta
  const params = await context.params;
  const id = params.id;

  // Validar ID
  if (!id) {
    return NextResponse.json(
      { error: "Falta el ID del artista" },
      { status: 400 },
    );
  }

  // Llamada a la API de Discogs
  try {
    const response = await fetch(`https://api.discogs.com/artists/${id}`, {
      headers: {
        Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`,
        "User-Agent": process.env.DISCOGS_USER_AGENT,
      },
    });

    // Manejar errores de la API
    if (!response.ok) {
      return NextResponse.json(
        { error: "Error obteniendo los detalles del artista" },
        { status: 404 },
      );
    }

    // Devolver datos formateados
    const data = await response.json();

    const formattedArtist = {
      id: data.id,
      name: data.name || "Artista Desconocido",
      cover:
        data.images && data.images.length > 0
          ? data.images[0].uri
          : "https://via.placeholder.com/300?text=Sin+Imagen",
      profile: data.profile || "Sin biografía disponible",
      members:
        data.members && data.members.length > 0
          ? data.members.map((m) => ({
              name: m.name,
              active: m.active,
            }))
          : [],
      urls: data.urls && data.urls.length > 0 ? data.urls.slice(0, 4) : [],
    };
    return NextResponse.json(formattedArtist);
  } catch (error) {
    // Mostrar error
    console.error("Error obteniendo los detalles del artista: ", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
