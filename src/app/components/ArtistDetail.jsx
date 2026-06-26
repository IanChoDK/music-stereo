import Link from "next/link";

export default function ArtistDetail({ artist, albums }) {
  return (
    <div className="max-w-6xl w-full text-white">
      <div className="flex gap-10">
        <img
          src={artist.cover}
          alt={artist.name}
          className="w-80 h-fit rounded-lg"
        />

        <div className="space-y-6">
          <h1 className="text-5xl font-bold">
            {artist.name}
          </h1>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              Biografía
            </h2>

            <p>{artist.profile}</p>
          </div>

          {artist.members.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Integrantes
              </h2>

              <ul className="list-disc list-inside">
                {artist.members.map((member) => (
                  <li key={member.name}>
                    {member.name}
                    {member.active && " (Activo)"}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {artist.urls.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Enlaces
              </h2>

              <ul>
                {artist.urls.map((url) => (
                  <li key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {albums.length > 0 && (
        <section className="mt-14">
          <h2 className="text-3xl font-bold mb-6">
            Álbumes
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {albums.map((album) => (
              <Link
                key={album.id}
                href={`/album/${album.id}`}
              >
                <div className="bg-zinc-900 rounded-lg p-4 hover:bg-zinc-800 transition cursor-pointer">
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="w-full rounded-md"
                  />

                  <h3 className="mt-3 font-semibold">
                    {album.title}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {album.year}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}