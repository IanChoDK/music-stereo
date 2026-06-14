export default function MusicCard({ key, album }) {
    return (
        <div key={key} className="flex flex-col items-center justify-center py-2.5">
            <h2 className='text-xl font-bold'>{album.title}</h2>
            <p>{album.artist}</p>
            <p>{album.year}</p>
        </div>
    )
}