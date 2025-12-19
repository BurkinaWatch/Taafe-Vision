import { Link } from "wouter";
import { ArrowRight, Play, Award, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useFilms } from "@/hooks/use-films";
import { motion } from "framer-motion";

export default function Home() {
  const { films } = useFilms();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-primary">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-background.png" 
            alt="Cinema Hero" 
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 via-primary/50 to-primary/40" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="container-wide relative z-10 text-center text-white space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-display font-bold leading-tight text-white"
          >
            Défendre les droits des femmes par le <span className="text-secondary">Cinéma</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl font-light max-w-3xl mx-auto text-gray-200"
          >
            Histoires authentiques, sans stéréotypes, pour sensibiliser à l'égalité des femmes et combattre les violences basées sur le genre.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <Link href="/projects" className="px-8 py-4 bg-secondary text-white rounded-full font-bold uppercase tracking-widest hover:bg-secondary/90 transition-all hover:scale-105 flex items-center justify-center gap-2">
              Nos Projets <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/about" className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all flex items-center justify-center">
              À Propos
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission Highlights */}
      <section className="py-24 bg-background">
        <div className="container-wide grid md:grid-cols-3 gap-12 text-center">
          <div className="p-8 rounded-2xl bg-white shadow-lg border border-border/50 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
              <Play className="w-8 h-8 fill-current" />
            </div>
            <h3 className="text-2xl font-display mb-4">Production</h3>
            <p className="text-muted-foreground leading-relaxed">Producing high-quality films and documentaries that amplify women's voices and perspectives.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white shadow-lg border border-border/50 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-secondary">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display mb-4">Training</h3>
            <p className="text-muted-foreground leading-relaxed">Providing professional training and mentorship programs for aspiring female filmmakers.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white shadow-lg border border-border/50 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display mb-4">Community</h3>
            <p className="text-muted-foreground leading-relaxed">Building a strong network of women in cinema across Burkina Faso and beyond.</p>
          </div>
        </div>
      </section>

      {/* Latest Films Preview */}
      <section className="py-24 bg-muted/30">
        <div className="container-wide">
          <SectionHeader 
            title="Productions Récentes" 
            subtitle="Découvrez nos dernières réalisations et succès cinématographiques."
            centered
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {films?.slice(0, 3).map((film) => (
              <div key={film.id} className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={film.imageUrl} alt={film.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-2xl font-display font-bold mb-1">{film.title}</h3>
                  <p className="text-white/80 text-sm font-medium mb-2">{film.director} • {film.year}</p>
                  <p className="text-white/60 text-sm line-clamp-2 mb-4">{film.synopsis}</p>
                  <Link href="/films" className="inline-flex items-center text-secondary font-bold text-sm uppercase tracking-wider hover:text-white transition-colors">
                    View Details <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
            
            {/* Fallback if no films */}
            {!films?.length && (
              <div className="col-span-full text-center py-12 text-muted-foreground bg-white rounded-xl border border-dashed border-border">
                <p>Pas de films ajoutés pour le moment. À bientôt!</p>
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <Link href="/films" className="inline-block px-8 py-3 border border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all uppercase tracking-widest text-sm">
              Voir tous les films
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
