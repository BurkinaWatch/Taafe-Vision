import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Film } from "@shared/schema";
import { PlayCircle, ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FilmDetail() {
  const [, params] = useRoute("/films/:id");
  const id = params?.id;

  const { data: film, isLoading } = useQuery<Film>({
    queryKey: [`/api/films/${id}`],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-xl text-gray-500">Chargement du film...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!film) {
    return (
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <h1 className="text-3xl font-display font-bold">Film non trouvé</h1>
          <Link href="/films">
            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" /> Retour aux films
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="container-wide">
          <Link href="/films">
            <Button variant="ghost" className="text-gray-400 hover:text-white mb-8 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Retour à la filmographie
            </Button>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Poster */}
            <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[3/4]">
              <img 
                src={film.imageUrl} 
                alt={film.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              
              {film.videoUrl && film.videoUrl !== "#" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                   <a href={film.videoUrl} target="_blank" rel="noopener noreferrer" className="transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <PlayCircle className="w-24 h-24 text-white drop-shadow-2xl" />
                  </a>
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-white leading-tight">
                  {film.title}
                </h1>
                
                <div className="flex flex-wrap gap-6 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <span className="font-medium">{film.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-secondary" />
                    <span className="font-medium">Réal. {film.director}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-display font-bold text-secondary border-b border-white/10 pb-4 uppercase tracking-widest">
                  Synopsis
                </h2>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                  {film.synopsis}
                </p>
              </div>

              {film.videoUrl && film.videoUrl !== "#" && (
                <div className="pt-8">
                  <a href={film.videoUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold h-14 px-10 rounded-full text-lg uppercase tracking-widest">
                      Visionner le film
                    </Button>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
