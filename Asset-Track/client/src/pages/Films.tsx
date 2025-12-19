import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useFilms } from "@/hooks/use-films";
import { PlayCircle } from "lucide-react";

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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {films?.map((film) => (
                <div key={film.id} className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl hover:shadow-secondary/20 transition-all duration-300 border border-gray-800">
                  <div className="aspect-[2/3] relative overflow-hidden bg-gray-800">
                    <img 
                      src={film.imageUrl} 
                      alt={film.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" 
                      onError={(e) => { e.currentTarget.src = "/images/film-poster-1.jpg"; }}
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
                      <a href={film.videoUrl || "#"} className="transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <PlayCircle className="w-16 h-16 text-white drop-shadow-lg" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-display font-bold text-white">{film.title}</h3>
                      <span className="text-sm font-mono text-secondary border border-secondary/30 px-2 py-0.5 rounded">{film.year}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4 font-medium uppercase tracking-wider">Dir. {film.director}</p>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{film.synopsis}</p>
                  </div>
                </div>
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
