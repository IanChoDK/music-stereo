import { NextResponse } from "next/server";

export async function GET(request) {
  // Obtener el ID del album desde los parámetros de la ruta
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  try {
    // Llamada a la Api de Discogs
    const response = await fetch(
      `https://api.discogs.com/database/search?q=${encodeURIComponent(query)}&per_page=10&page=1`,
      {
        headers: {
          // Variables de entorno para autenticacion
          Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`,
          "User-Agent": process.env.DISCOGS_USER_AGENT,
        },
      },
    );

    const data = await response.json();

    // Filtrar para recibir solo artistas o masters
    if (data.results) {
      data.results = data.results.filter(
        (item) => item.type === "artist" || item.type === "master",
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    // Manejar errores de la API
    console.error("Error obteniendo los resultados de la busqueda:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
