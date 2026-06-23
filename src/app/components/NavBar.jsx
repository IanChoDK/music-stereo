import Link from "next/link";
import SearchBar from "./SearchBar";

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 w-full h-16 bg-zinc-900 backdrop-blur-md text-white flex items-center justify-between px-8 border-b border-zinc-800">
      
      <div className="flex items-center gap-2">
        <a className="text-2xl">🎧</a>
        <Link href="/" className="text-xl font-bold hover:text-red-600 transition-colors">
          MUSIC<span className="text-zinc-400">STEREO</span>
        </Link>
      </div>

      <div className="flex items-center gap-8">
        <SearchBar />
        
        <div className="flex items-center gap-6 text-zinc-400">
          <Link href="/albums" className="hover:text-white transition-colors">
            Albums
          </Link>
          <Link href="/random" className="hover:text-white transition-colors">
            Random
          </Link>
          <Link href="/profile" className="hover:text-red-600 transition-colors flex items-center gap-2">
            <span className="w-6 h-6 bg-zinc-800 rounded-full border border-zinc-700 flex items-center justify-center text-xs text-white">🎧</span>
            Profile
          </Link>
        </div>
      </div>
      
    </nav>
  );
}
