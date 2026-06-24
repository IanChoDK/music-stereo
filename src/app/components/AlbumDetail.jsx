export default function AlbumDetail({ album }) {
  const coverImage = album.images?.[0]?.uri;
  const artistName = album.artists?.[0]?.name || "Artista Desconocido";
  const tracklist = album.tracklist || [];

  return (
    <div className="flex w-full flex-row justify-between">
      {/* Informacion del album */}
      <section className="flex flex-col items-center justify-center bg-gray-800 px-3 pb-10 rounded-lg">
        <img
          src={coverImage}
          alt={album.title}
          className="w-75 h-auto object-cover rounded-lg my-4"
        />
        <h2 className="text-3xl font-bold">{album.title}</h2>
        <p>{artistName}</p>
        <p>Lanzamiento: {album.year || "N/A"}</p>
        {album.genres && <p>{album.genres.join(", ")}</p>}
      </section>

      {/* Tracklist */}
      <section className="flex flex-col items-center justify-center">
        <h3 className="text-5xl my-4 font-semibold">Songs</h3>
        {tracklist.length > 0 ? (
          <ul className="text-center text-2xl">
            {album.songs.map((song, index) => (
              <li key={index}>
                {song.position}
                {song.title}

                {song.duration && <p>{song.duration}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No hay lista de canciones disponible.</p>
        )}
      </section>
    </div>
  );
}
