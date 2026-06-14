import { getAlbumById } from "@/lib/albums"
import AlbumDetail from "@/app/components/AlbumDetail"

export default async function Album({ params }) {

    const { id } = await params
    const album = getAlbumById(id)

    return (
        <div className="flex flex-col flex-1 items-center justify-center">
            <main className="flex flex-1 w-full flex-col items-center justify-between py-10 px-16">
                <AlbumDetail album={album} />
            </main>
        </div>
    )
}