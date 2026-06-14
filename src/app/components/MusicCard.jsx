import Link from "next/link"

export default function MusicCard({ key, album }) {
    return (
        <div key={key} className="flex max-w-55 text-center w-full flex-col items-center justify-center py-2.5 bg-gray-800 rounded-lg">
            <img src={album.cover} alt={album.title} className="w-50 h-auto rounded-lg" />
            <h2 className='text-xl font-bold'>{album.title}</h2>
            <p>{album.artist}</p>
            <Link href={`/albums/${album.id}`} className="bg-gray-200 text-black px-4 py-2 rounded-full mt-2 hover:bg-gray-500">
                Details
            </Link>
        </div>
    )
}