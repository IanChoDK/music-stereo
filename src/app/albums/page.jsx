import { getAlbum } from '@/lib/albums'
import MusicCard from '../components/MusicCard'
import Link from 'next/link'

export default function Albums() {
    const albums = getAlbum()

    return (
        <div className="flex flex-col flex-1 items-center justify-center">
            <main className="flex flex-1 w-full max-w-6xl flex-col items-center justify-between py-20 px-16">
                <h1 className="max-w-xs text-3xl font-semibold">
                    Albums
                </h1>

                <Link href="/albums/create" className="px-4 py-2 my-10 bg-gray-800 text-white rounded-xl hover:bg-blue-800">
                    Create Album
                </Link>

                <div className='flex flex-row flex-wrap gap-8 justify-center'>
                    {albums.map((album, key) => (
                        <MusicCard key={key} album={album} />
                    ))}
                </div>
            </main>
        </div>
    )
}