import { Link } from "wouter";
import { ArrowRight, Play, Award, Users, Star, Film, Tv, Sparkles, Heart, HandHeart, Gift } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useFilms } from "@/hooks/use-films";
import { useImpactMetrics } from "@/hooks/use-knowledge";
import { motion } from "framer-motion";
import { Marquee } from "@/components/Marquee";
import { Counter } from "@/components/Counter";
import type { Film as FilmType } from "@/lib/api";
import { OptimizedImage } from "@/components/OptimizedImage";

// ... partners import ...

// Import partner logos
import abcaLogo from "@/assets/partners/abca.png";
import equiPopLogo from "@/assets/partners/equi_pop.png";
import fdctLogo from "@/assets/partners/fdct.jpg";
import fespacoLogo from "@/assets/partners/fespaco.jpg";
import fjsLogo from "@/assets/partners/fjs.png";
import ueLogo from "@/assets/partners/ue.png";
import canalPlusLogo from "@/assets/partners/canal-plus.jpg";
import canalPlusUniversityLogo from "@/assets/partners/canal-plus-university.jpg";
import girlFirstFundLogo from "@/assets/partners/girl-first-fund.jpg";
import loumbamaProductionLogo from "@/assets/partners/loumbama-production.svg";
import filmsDuDromadaireLogo from "@/assets/partners/films-du-dromadaire.jpg";
import isisSeLogo from "@/assets/partners/isis-se.jpg";
import fasoFilmsFondsLogo from "@/assets/partners/faso-films-fonds.jpg";
import ministereCommunicationLogo from "@/assets/partners/ministere-communication-culture-tourisme.jpg";

const PARTNERS = [
  { name: "ABCA", logo: abcaLogo },
  { name: "EquiPop", logo: equiPopLogo },
  { name: "FDCT", logo: fdctLogo },
  { name: "FESPACO", logo: fespacoLogo },
  { name: "Foundation for a Just Society", logo: fjsLogo },
  { name: "Union Européenne", logo: ueLogo },
  { name: "Canal+", logo: canalPlusLogo },
  { name: "Canal+ University", logo: canalPlusUniversityLogo },
  { name: "Girl First Fund", logo: girlFirstFundLogo },
  { name: "Loumbama Production", logo: loumbamaProductionLogo },
  { name: "Les Films du Dromadaire", logo: filmsDuDromadaireLogo },
  { name: "ISIS/SE", logo: isisSeLogo },
  { name: "Faso Films Fonds", logo: fasoFilmsFondsLogo },
  { name: "Ministère de la Communication, de la Culture, des Arts et du Tourisme", logo: ministereCommunicationLogo },
];

export default function Home() {
  const filmsResult = useFilms();
  const films = filmsResult?.films;
  const { metrics } = useImpactMetrics();

  // Helper: find a metric by label keyword
  const getMetric = (keyword: string) =>
    metrics.find((m: any) => m.label.toLowerCase().includes(keyword.toLowerCase()));

  return (
    <div className="page-shell">
      <Navbar />
      {/* ... previous sections remain the same ... */}
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden page-hero">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
           <OptimizedImage
            src="/images/hero-background.png" 
            alt="Cinema Hero" 
            className="w-full h-full object-cover opacity-85 transition-all duration-1000"
             priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/30 to-transparent" />
        </div>

        <div className="container-wide relative z-10 text-white space-y-10">
          <div className="max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-display font-bold leading-[0.9] mb-8"
            >
              <span className="text-primary">TAAFÉ</span> <span className="text-secondary">V</span><span className="text-primary">ISION</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl font-light max-w-2xl text-background/75 leading-relaxed"
            >Artivisme pour un monde plus juste</motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 pt-10"
            >
              <Link href="/projects" className="px-10 py-5 bg-primary text-primary-foreground rounded-full font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-3 group">
                Découvrir nos actions <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/about" className="px-10 py-5 border border-background/30 text-background rounded-full font-bold uppercase tracking-widest hover:bg-background/10 transition-all flex items-center justify-center">
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
      <section className="py-32 relative overflow-hidden page-section">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

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
              <div className="page-pill mb-6">
                <Sparkles className="w-3 h-3" /> Chiffres Clés
              </div>
              <h2 className="text-5xl font-display font-bold text-foreground leading-tight mb-6">Notre impact en chiffres.</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">Chaque chiffre raconte une histoire de changement, d'engagement et de passion pour le cinéma burkinabè.</p>
              <div className="h-1.5 w-16 bg-secondary rounded-full" />
            </motion.div>
            
            <div className="lg:col-span-3 grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* Carte 1 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="page-card relative p-8 hover:border-primary/40 group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Users className="w-24 h-24 text-primary" />
                </div>
                <div className="relative z-10">
                  <div className="text-7xl font-display font-bold text-primary mb-4 tracking-tighter">
                    <Counter value={metrics[0]?.value ?? 33} suffix={metrics[0]?.suffix ?? "+"} />
                  </div>
                  <h4 className="text-slate-900 font-bold text-lg mb-2">{metrics[0]?.label ?? "Femmes formées"}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{metrics[0]?.description ?? "Accompagnement technique et artistique complet pour les futures cinéastes."}</p>
                </div>
              </motion.div>

              {/* Carte 2 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="page-card relative p-8 hover:border-secondary/50 group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Film className="w-24 h-24 text-secondary" />
                </div>
                <div className="relative z-10">
                  <div className="text-7xl font-display font-bold text-secondary mb-4 tracking-tighter">
                    <Counter value={15} suffix={metrics[1]?.suffix ?? "+"} />
                  </div>
                  <h4 className="text-slate-900 font-bold text-lg mb-2">{metrics[1]?.label ?? "Films produits"}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{metrics[1]?.description ?? "Documentaires et fictions engagés pour le changement social et l'égalité."}</p>
                </div>
              </motion.div>

              {/* Carte 3 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="page-card relative p-8 hover:border-primary/40 group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Star className="w-24 h-24 text-primary" />
                </div>
                <div className="relative z-10">
                  <div className="text-7xl font-display font-bold text-primary mb-4 tracking-tighter">
                    <Counter value={15000} suffix={metrics[2]?.suffix ?? "+"} animate={false} />
                  </div>
                  <h4 className="text-slate-900 font-bold text-lg mb-2">{metrics[2]?.label ?? "Personnes sensibilisées"}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{metrics[2]?.description ?? "Personnes touchées par nos projections et débats communautaires."}</p>
                </div>
              </motion.div>

              {/* Carte 4 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="page-card relative p-8 hover:border-border group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Tv className="w-24 h-24 text-[#561a44]" />
                </div>
                <div className="relative z-10">
                  <div className="text-7xl font-display font-bold text-[#561a44] mb-4 tracking-tighter">10.000.000+</div>
                  <h4 className="text-slate-900 font-bold text-lg mb-2">Téléspectateurs</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Un public de plus de 10 millions de téléspectateurs touché par nos films et nos actions.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* Engagement Section */}
      <section id="engagement" className="relative scroll-mt-32 overflow-hidden page-hero py-24">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-secondary/15 blur-3xl" />

        <div className="container-wide relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="page-pill mb-5 bg-background/10 text-accent">
              <Heart className="h-4 w-4 fill-current" />
              Agir avec Taafé Vision
            </div>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
              Votre engagement fait avancer l’égalité.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-background/70">
              Rejoignez notre mouvement pour donner plus de place aux femmes dans le cinéma et faire vivre des histoires qui transforment les regards.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                href: "/contact?action=engagement",
                title: "S'engager",
                description: "Partagez vos idées, vos compétences ou votre envie de soutenir nos actions.",
                icon: Heart,
                className: "bg-primary hover:bg-primary/90",
              },
              {
                href: "/volunteer",
                title: "Devenir bénévole",
                description: "Mettez votre temps et vos talents au service de nos projets et de nos communautés.",
                icon: HandHeart,
                className: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
              },
              {
                href: "/contact?action=don",
                title: "Faites un don",
                description: "Contribuez à la production, la formation et la diffusion de récits qui changent les choses.",
                icon: Gift,
                className: "bg-accent text-accent-foreground hover:bg-accent/90",
              },
            ].map(({ href, title, description, icon: Icon, className }) => (
              <Link
                key={title}
                href={href}
                aria-label={`${title} avec Taafé Vision`}
                className={`group rounded-2xl p-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#f8d34f]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${className}`}
              >
                <div className="mb-6 flex items-center justify-between">
                  <Icon className="h-8 w-8" aria-hidden="true" />
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </div>
                <h3 className="font-display text-2xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-80">{description}</p>
              </Link>
            ))}
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
            {(films || []).slice(0, 3).map((film: FilmType) => (
              <div key={film.id} className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
                <div className="aspect-[3/4] overflow-hidden">
                  <OptimizedImage
                    src={film.imageUrl.startsWith("/images/") ? film.imageUrl : "/images/community-screening.jpg"}
                    alt={film.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    fallbackSrc="/images/community-screening.jpg"
                  />
                  {/* Glassmorphism overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out z-20">
                  <div className="bg-black/20 backdrop-blur-md p-4 rounded-lg border border-white/10 shadow-2xl">
                    <h3 className="text-2xl font-display font-bold mb-1 text-white drop-shadow-md">{film.title}</h3>
                    <p className="text-secondary font-bold text-sm mb-2">{film.director} • {film.year}</p>
                    <p className="text-white/90 text-sm line-clamp-2 mb-4 leading-relaxed">{film.synopsis}</p>
                    <Link href={`/films/${film.id}`} className="inline-flex items-center text-white font-bold text-sm uppercase tracking-wider hover:text-secondary transition-colors group/link">
                      <span className="relative">
                        Voir détails
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all group-hover/link:w-full"></span>
                      </span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Fallback if no films */}
            {(!films || films.length === 0) && (
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
      <section id="partners" className="py-24 bg-white scroll-mt-32">
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

