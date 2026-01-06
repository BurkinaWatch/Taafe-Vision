import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useFilms } from "@/hooks/use-films";
import { PlayCircle } from "lucide-react";
import { Link } from "wouter";

export default function Films() {
  const { films, isLoading } = useFilms();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-black text-white min-h-screen pb-24 pt-32">
        <div className="container-wide">
          <div className="mb-16 text-center">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">Films Produits</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Une collection d'histoires portées par des réalisatrices talentueuses.
            </p>
          </div>

          {isLoading ? (
             <div className="text-center py-20 text-gray-500">Chargement de la filmographie...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {films?.map((film) => (
                <Link key={film.id} href={`/films/${film.id}`}>
                  <div className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl hover:shadow-secondary/20 transition-all duration-300 border border-gray-800 flex flex-col h-full cursor-pointer">
                    <div className="aspect-[3/4] relative overflow-hidden bg-gray-800">
                      <img 
                        src={film.imageUrl} 
                        alt={film.title} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60" />
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h3 className="text-lg font-display font-bold text-white leading-tight">{film.title}</h3>
                        <span className="text-xs font-mono text-secondary border border-secondary/30 px-1.5 py-0.5 rounded whitespace-nowrap">{film.year}</span>
                      </div>
                      <p className="text-xs text-gray-400 mb-4 font-medium uppercase tracking-wider">Réal. {film.director}</p>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-4">{film.synopsis}</p>
                    </div>
                  </div>
                </Link>
              ))}

              {!films?.length && (
                <div className="col-span-full py-20 text-center text-gray-500 border border-gray-800 rounded-xl">
                  <p>Pas de films dans le catalogue.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
