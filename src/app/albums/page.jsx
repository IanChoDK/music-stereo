import Link from 'next/link'
import AlbumsList from "../components/AlbumsList";

export default function Albums() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center text-white">
            <main className="flex flex-1 w-full max-w-6xl flex-col items-center justify-between py-20 px-16">
                <h1 className="max-w-xs text-3xl font-semibold">
                    Albums
                </h1>

                <Link href="/albums/create" className="px-4 py-2 my-10 bg-gray-800 text-white rounded-xl hover:bg-blue-800 transition-colors">
                    Create Album
                </Link>

                <AlbumsList />
            </main>
        </div>
    )
}