export default function AlbumDetail({ album }) {
  return (
    <div className="flex w-full flex-row justify-between">
      <section className="flex flex-col items-center justify-center bg-gray-800 px-3 pb-10 rounded-lg">
        <img
          src={album.cover}
          alt={album.title}
          className="w-75 h-auto object-cover rounded-lg my-4"
        />
        <h2 className="text-3xl font-bold">{album.title}</h2>
        <p>{album.artist}</p>
        <p>{album.year}</p>
      </section>

      <section className="flex flex-col items-center justify-center">
        <h3 className="text-5xl my-4 font-semibold">Songs</h3>
        <ul className="text-center text-2xl">
          {album.songs.map((song, key) => (
            <li key={key}>{song}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
