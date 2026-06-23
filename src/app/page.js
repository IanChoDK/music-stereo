import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-950 text-white">
      
      <div className="text-center px-6 max-w-4xl flex flex-col items-center">
        
        <h1 className="text-7xl font-sans mb-6 text-zinc-100">
          MUSIC <br/>
          <span className="text-red-600">STEREO</span>
        </h1>
        
        <p className="text-xl text-zinc-400 mb-10">
          Bienvenido a Music-Stereo, una pagina para descubrir musica y ordenarla en tu coleccion personal.
        </p>
        
        <div className="flex flex-row gap-4 w-full justify-center">
          <Link 
            href="/albums" 
            className="px-8 py-3 bg-zinc-400 text-black font-semibold rounded-full hover:bg-white transition-colors text-center"
          >
            Ver Coleccion
          </Link>
          <Link 
            href="/random" 
            className="px-8 py-3 bg-zinc-900 text-white font-semibold rounded-full border border-zinc-700 hover:bg-zinc-800 transition-colors text-center"
          >
            Descubrir Musica
          </Link>
        </div>
      </div>

    </div>
  );
}
