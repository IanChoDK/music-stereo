// app/albums/layout.jsx
import Link from "next/link"

export default function AlbumsLayout({ children }) {
  return (
    <div className="flex flex-col flex-1">
      <div className="w-full bg-gray-900 text-white px-8 py-3 flex items-center gap-6 text-sm border-b border-gray-700">
        <span className="text-zinc-400 font-medium">Albums</span>
        <Link href="/albums" className="hover:text-white text-zinc-400 transition-colors">
          Ver todos
        </Link>
        <Link href="/albums/create" className="hover:text-white text-zinc-400 transition-colors">
          + Crear album
        </Link>
      </div>
      {children}
    </div>
  )
}