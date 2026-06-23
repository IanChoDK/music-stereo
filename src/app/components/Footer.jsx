export default function Footer() {
    return (
        <footer className="w-full bg-zinc-950 text-zinc-500 py-8 border-t border-zinc-800 flex flex-col items-center justify-center">
            
            <div className="flex gap-6 mb-4 text-sm font-medium">
                <span className="hover:text-zinc-300 cursor-pointer transition-colors">Acerca de</span>
                <span className="hover:text-zinc-300 cursor-pointer transition-colors">Soporte</span>
                <span className="hover:text-zinc-300 cursor-pointer transition-colors">Términos</span>
            </div>
            
            <p className="text-xs">
                &copy; 2026 Music Stereo. Realizado con Next.js por A.M, C.M, F.M, I.I, P.F.
            </p>
        </footer>
    )
}