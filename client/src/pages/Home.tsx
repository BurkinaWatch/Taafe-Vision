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
      <section className="relative h-screen flex items-center overflow-hidden bg-slate-950">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-background.png" 
            alt="Cinema Hero" 
            className="w-full h-full object-cover opacity-50 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-slate-950/60" />
        </div>

        <div className="container-wide relative z-10 text-white space-y-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="h-px w-12 bg-secondary" />
              <span className="text-secondary uppercase tracking-[0.3em] text-sm font-bold">Depuis 2017</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-display font-bold leading-[0.9] mb-8"
            >
              <span className="text-[#f146ad]">TAAFÉ</span> <span className="text-[#39cd15]">V</span><span className="text-[#f146ad]">ISION</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl font-light max-w-2xl text-slate-300 leading-relaxed"
            >
              Taafé Vision utilise le septième art comme un levier puissant pour la défense des droits des femmes et l'égalité des genres au Burkina Faso.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 pt-10"
            >
              <Link href="/projects" className="px-10 py-5 bg-white text-slate-950 rounded-sm font-bold uppercase tracking-widest hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-3 group">
                Découvrir nos actions <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/about" className="px-10 py-5 border border-white/20 text-white rounded-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center">
                Notre Vision
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-32 relative overflow-hidden bg-[#fdf8e6]">
        {/* Afro-style Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
        
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-4 gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <h2 className="text-4xl font-display font-bold text-slate-950 leading-tight">Notre impact en chiffres.</h2>
              <div className="h-1.5 w-16 bg-[#39cd15] mt-6" />
            </motion.div>
            
            <div className="lg:col-span-3 grid md:grid-cols-3 gap-12">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-3 p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-[#f146ad]/10 hover:shadow-xl transition-all group"
              >
                <div className="text-6xl font-display font-bold text-[#f146ad] group-hover:scale-110 transition-transform duration-300 origin-left">50+</div>
                <p className="text-slate-700 uppercase tracking-widest text-xs font-bold">Femmes cinéastes formées</p>
                <p className="text-sm text-slate-500 leading-relaxed">Accompagnement technique et artistique complet.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-3 p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-[#39cd15]/10 hover:shadow-xl transition-all group"
              >
                <div className="text-6xl font-display font-bold text-[#39cd15] group-hover:scale-110 transition-transform duration-300 origin-left">15+</div>
                <p className="text-slate-700 uppercase tracking-widest text-xs font-bold">Productions réalisées</p>
                <p className="text-sm text-slate-500 leading-relaxed">Documentaires et fictions engagés pour le changement.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-3 p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-[#f146ad]/10 hover:shadow-xl transition-all group"
              >
                <div className="text-6xl font-display font-bold text-[#f146ad] group-hover:scale-110 transition-transform duration-300 origin-left">10k+</div>
                <p className="text-slate-700 uppercase tracking-widest text-xs font-bold">Personnes sensibilisées</p>
                <p className="text-sm text-slate-500 leading-relaxed">À travers nos projections et débats communautaires.</p>
              </motion.div>
            </div>
          </div>
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
