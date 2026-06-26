export default function AlbumDetail({ album }) {
  return (
    <div className="flex flex-row w-full gap-10 bg-zinc-900 p-8 border border-zinc-800 mt-8">
      
      <section className="flex flex-col items-center w-1/4">

        <img
          src={album.cover}
          alt={album.title}
          className="w-full object-cover rounded border-4 border-zinc-800 mb-6"
        />
        
        <div className="text-center w-full">
          <h2 className="text-3xl font-extrabold text-white mb-2">
            {album.title}
          </h2>
          <p className="text-s text-zinc-400 mb-6">
            {album.artist}
          </p>

          <div className="flex flex-col gap-3 w-full bg-zinc-950 p-4 rounded border border-zinc-800 text-zinc-400 text-left">
            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <span>AÑO:</span>
              <span className="text-zinc-200">{album.year}</span>
            </div>
            
            {album.country && (
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span>PAÍS:</span>
                <span className="text-zinc-200">{album.country}</span>
              </div>
            )}

            {album.genre && album.genre.length > 0 && (
              <div className="flex flex-col pt-1">
                <span className="mb-2">GÉNEROS:</span>
                <div className="flex flex-wrap gap-2">
                  {album.genre.map((g, i) => (
                    <span key={i} className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-300 border border-zinc-700">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="flex flex-col w-3/4 bg-zinc-950/75 p-6 rounded border border-zinc-800">
        <div className="flex items-center gap-4 mb-6">
          <h3 className="text-2xl font-bold text-white">TRACKLIST</h3>
        </div>

        {album.songs && album.songs.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {album.songs.map((song, key) => (
              <li 
                key={key} 
                className="flex items-center gap-4 py-3 px-4 bg-zinc-900 rounded hover:bg-zinc-800 transition-colors border border-zinc-800/50"
              >
                <span className="text-zinc-200 text-lg">
                  {song}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-full min-h-200px border-2 border-zinc-800 rounded">
            <p className="text-zinc-500 text-center">
              Este album no contiene canciones.
            </p>
          </div>
        )}
      </section>
      
    </div>
  );
}
