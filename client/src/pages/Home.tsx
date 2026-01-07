import { Link } from "wouter";
import { ArrowRight, Play, Award, Users, Star, Film, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useFilms } from "@/hooks/use-films";
import { motion } from "framer-motion";
import { Marquee } from "@/components/Marquee";
import { Counter } from "@/components/Counter";

// ... partners import ...

// Import partner logos
import abcaLogo from "@/assets/partners/abca.png";
import equiPopLogo from "@/assets/partners/equi_pop.png";
import fdctLogo from "@/assets/partners/fdct.jpg";
import fespacoLogo from "@/assets/partners/fespaco.jpg";
import fjsLogo from "@/assets/partners/fjs.png";
import ueLogo from "@/assets/partners/ue.png";

const PARTNERS = [
  { name: "ABCA", logo: abcaLogo },
  { name: "EquiPop", logo: equiPopLogo },
  { name: "FDCT", logo: fdctLogo },
  { name: "FESPACO", logo: fespacoLogo },
  { name: "Foundation for a Just Society", logo: fjsLogo },
  { name: "Union Européenne", logo: ueLogo },
];

export default function Home() {
  const filmsResult = useFilms();
  const films = filmsResult?.films;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* ... previous sections remain the same ... */}

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
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#f146ad]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#39cd15]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        {/* Afro-style Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
        
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-4 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f146ad]/10 text-[#f146ad] text-xs font-bold uppercase tracking-widest mb-6">
                <Sparkles className="w-3 h-3" /> Chiffres Clés
              </div>
              <h2 className="text-5xl font-display font-bold text-slate-950 leading-tight mb-6">Notre impact en chiffres.</h2>
              <p className="text-slate-600 leading-relaxed mb-8">Chaque chiffre raconte une histoire de changement, d'engagement et de passion pour le cinéma burkinabè.</p>
              <div className="h-1.5 w-16 bg-[#39cd15]" />
            </motion.div>
            
            <div className="lg:col-span-3 grid md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative p-8 rounded-3xl bg-white shadow-[0_20px_50px_rgba(241,70,173,0.05)] border border-[#f146ad]/5 hover:border-[#f146ad]/20 transition-all group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Users className="w-24 h-24 text-[#f146ad]" />
                </div>
                <div className="relative z-10">
                  <div className="text-7xl font-display font-bold text-[#f146ad] mb-4 tracking-tighter">
                    <Counter value={50} suffix="+" />
                  </div>
                  <h4 className="text-slate-900 font-bold text-lg mb-2">Femmes formées</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Accompagnement technique et artistique complet pour les futures cinéastes.</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative p-8 rounded-3xl bg-white shadow-[0_20px_50px_rgba(57,205,21,0.05)] border border-[#39cd15]/5 hover:border-[#39cd15]/20 transition-all group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Film className="w-24 h-24 text-[#39cd15]" />
                </div>
                <div className="relative z-10">
                  <div className="text-7xl font-display font-bold text-[#39cd15] mb-4 tracking-tighter">
                    <Counter value={15} suffix="+" />
                  </div>
                  <h4 className="text-slate-900 font-bold text-lg mb-2">Productions</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Documentaires et fictions engagés pour le changement social et l'égalité.</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative p-8 rounded-3xl bg-white shadow-[0_20px_50px_rgba(241,70,173,0.05)] border border-[#f146ad]/5 hover:border-[#f146ad]/20 transition-all group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Star className="w-24 h-24 text-[#f146ad]" />
                </div>
                <div className="relative z-10">
                  <div className="text-7xl font-display font-bold text-[#f146ad] mb-4 tracking-tighter">
                    <Counter value={10} suffix="k+" />
                  </div>
                  <h4 className="text-slate-900 font-bold text-lg mb-2">Sensibilisées</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Personnes touchées par nos projections et débats communautaires.</p>
                </div>
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
            <p className="text-muted-foreground leading-relaxed">Production de films et documentaires de haute qualité qui amplifient les voix et les perspectives des femmes.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white shadow-lg border border-border/50 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-secondary">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display mb-4">Formation</h3>
            <p className="text-muted-foreground leading-relaxed">Programmes de formation professionnelle et de mentorat pour les futures cinéastes.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white shadow-lg border border-border/50 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display mb-4">Communauté</h3>
            <p className="text-muted-foreground leading-relaxed">Construction d'un réseau solide de femmes dans le cinéma au Burkina Faso et au-delà.</p>
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
            {films?.filter(f => f.imageUrl.startsWith('/images/')).slice(0, 3).map((film) => (
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
                    Voir détails <ArrowRight className="w-4 h-4 ml-2" />
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

      {/* Partners Section */}
      <section className="py-24 bg-white">
        <div className="container-wide">
          <SectionHeader 
            title="Nos Partenaires" 
            subtitle="Ensemble, nous unissons nos forces pour promouvoir le cinéma comme levier d'émancipation et de défense des droits des femmes au Burkina Faso."
            centered
          />

          <div className="mt-16 relative">
            {/* Gradient Masking */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
            
            <Marquee speed={60}>
              {PARTNERS.map((partner, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-center px-12 opacity-80 hover:opacity-100 transition-all duration-300"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="h-16 w-auto object-contain"
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

