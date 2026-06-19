import Link from "next/link";
import SearchBar from "./SearchBar";

export default function NavBar() {
  return (
    <nav className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-8">
      <div className="">
        <h1 className="text-2xl font-bold">Music Stereo</h1>
      </div>
      <div className="flex items-center">
        <SearchBar />
        <Link href="/" className="ml-4 hover:text-gray-400">
          Home
        </Link>
        <Link href="/albums" className="ml-4 hover:text-gray-400">
          Albums
        </Link>
        <Link href="/random" className="ml-4 hover:text-gray-400">
          Random
        </Link>
        <Link href="/profile" className="ml-4 hover:text-gray-400">
          Profile
        </Link>
      </div>
    </nav>
  );
}
