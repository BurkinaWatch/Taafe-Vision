import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { usePartners } from "@/hooks/use-partners";
import { useOrganizationProfile, useImpactMetrics, useResearchSources, useSocialLinks } from "@/hooks/use-knowledge";
import logoImg from "@assets/WhatsApp_Image_2026-01-06_at_21.59.54_1767830805032.jpeg";

const SOCIAL_ICONS: Record<string, JSX.Element> = {
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
  ),
};

export default function About() {
  const { partners } = usePartners();
  const { profile } = useOrganizationProfile();
  const { metrics } = useImpactMetrics();
  const { sources } = useResearchSources();
  const { socials } = useSocialLinks();

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <div className="py-32 text-white relative overflow-hidden">
        {/* Artistic Logo Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={logoImg} 
            alt="" 
            className="w-full h-full object-cover opacity-20 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/40" />
        </div>

        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">À PROPOS DE <br /> TAAFE VISION</h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Une organisation féministe, apolitique et laïque qui milite pour une représentativité plus significative de la femme dans l’industrie cinématographique.
            </p>
          </div>
        </div>
      </div>

      <div className="container-wide py-24 space-y-32">
        
        {/* Qui sommes-nous & Histoire Section */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-secondary mb-4">Qui sommes-nous ?</h2>
              <h3 className="text-3xl font-display font-bold text-slate-900 mb-6">Notre histoire</h3>
              {profile?.story ? (
                <>
                  {profile.story
                    .split("\n\n")
                    .filter((p: string) => !p.startsWith("La présidente"))
                    .map((para: string, i: number) => (
                      <p key={i} className="text-lg text-slate-700 leading-relaxed mb-4">
                        {para}
                      </p>
                    ))}
                </>
              ) : (
                <>
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    En 2016, un groupe de femmes professionnelles du cinéma et de l'audiovisuel ont décidé de créer une association pour formaliser leur engagement commun pour une meilleure représentativité des femmes dans l'industrie cinématographique.
                  </p>
                  <p className="text-lg text-slate-700 leading-relaxed">
                    C'est ainsi que naquit Taafé Vision, fondée officiellement le 9 janvier 2017 à Ouagadougou.
                  </p>
                </>
              )}
            </div>

            {/* Founder quote */}
            {profile?.story?.includes("Azaratou Bancé") && (
              <blockquote className="border-l-4 border-secondary pl-6 py-2 my-6">
                <p className="text-slate-700 italic leading-relaxed text-base mb-3">
                  « Il n'est pas rare que lors des diffusions des films, nous soyons approchées par des femmes qui nous confient leur vécu en rapport avec la situation présentée dans le film. Pour elles, voir un personnage prendre son destin en main leur donne l'espoir de faire pareil. »
                </p>
                <footer className="text-sm font-bold text-secondary uppercase tracking-widest">
                  Azaratou Bancé — Présidente de Taafé Vision
                </footer>
              </blockquote>
            )}
          </div>
          <div className="relative">
            <img 
              src="/images/community-engagement-1.jpg" 
              alt="Association Taafé Vision" 
              className="rounded-lg shadow-2xl relative z-10 w-full"
            />
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-secondary/10 rounded-lg -z-0" />
            <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
              <p className="text-slate-700 leading-relaxed italic">
                {profile?.meaning ?? "« Taafé » signifie en langue bambara le pagne. Le pagne symbolisant la femme au Burkina Faso, Taafé Vision signifie littéralement « Vision de femmes »."}
              </p>
              {profile?.foundedYear && (
                <div className="flex gap-6 pt-2 text-sm font-bold text-slate-500 uppercase tracking-widest">
                  <span>Fondée en {profile.foundedYear}</span>
                  {profile.city && <span>· {profile.city}</span>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-slate-900 text-white p-12 rounded-2xl space-y-6">
            <h3 className="text-2xl font-display font-bold text-secondary">Notre Mission</h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              {profile?.mission ?? "Produire et diffuser des films exempts de stéréotypes du genre et qui soutiennent l'abandon de toutes sortes de violences basées sur le genre tout en contribuant à la promotion de la femme dans un monde plus juste, plus égalitaire."}
            </p>
          </div>
          <div className="bg-secondary text-white p-12 rounded-2xl space-y-6">
            <h3 className="text-2xl font-display font-bold">Notre Vision</h3>
            <p className="text-white/90 text-lg leading-relaxed">
              {profile?.vision ?? "À l'orée de 2030, être une association leader dans la lutte pour un monde plus égalitaire, plus juste et exempt de toute forme de violence à l'égard de la femme, au moyen du film."}
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Nos Valeurs nous distinguent</h2>
            <p className="text-slate-500 uppercase tracking-widest text-xs font-bold">Taafé Vision est une association féministe régie par des principes fondamentaux</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { title: "Dignité", desc: "Respect profond de chaque individu." },
              { title: "Responsabilité", desc: "Engagement total dans nos actions." },
              { title: "Intersectionnalité", desc: "Reconnaissance des multiples formes de discrimination." },
              { title: "Autonomie", desc: "Capacité à agir et décider librement." },
              { title: "Egalité", desc: "Droit à l'égalité des chances et de traitement." }
            ].map((value) => (
              <div key={value.title} className="text-center group p-6 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary group-hover:text-white transition-colors">
                  <span className="font-bold">{value.title[0]}</span>
                </div>
                <h4 className="text-xl font-display font-bold text-slate-900 mb-2">{value.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Axes Stratégiques Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-slate-50 rounded-3xl p-12 md:p-20 relative overflow-hidden"
        >
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          
          <div className="max-w-3xl mb-12 relative z-10">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-6 flex items-center gap-4">
              <span className="w-12 h-1 bg-secondary rounded-full" />
              Axes Stratégiques
            </h2>
            <p className="text-slate-600 text-lg">
              La réalisation de notre vision passe par trois enjeux majeurs de développement :
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {[
              { 
                axe: "Axe 1", 
                title: "Production & Diffusion", 
                desc: "Renforcement de la production et de la diffusion de films réalisés par les femmes.",
                icon: "🎬"
              },
              { 
                axe: "Axe 2", 
                title: "Promotion de la femme", 
                desc: "Promotion de la femme au travers du cinéma.",
                icon: "🤝"
              },
              { 
                axe: "Axe 3", 
                title: "Capacités techniques", 
                desc: "Renforcement des capacités techniques et organisationnelles de Taafé Vision.",
                icon: "⚙️"
              }
            ].map((axe, index) => (
              <motion.div 
                key={axe.axe}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex justify-between items-start">
                  <span className="text-secondary font-bold text-sm tracking-widest uppercase">{axe.axe}</span>
                  <span className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">{axe.icon}</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 group-hover:text-secondary transition-colors">{axe.title}</h4>
                <p className="text-slate-600 leading-relaxed">{axe.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Impact Metrics Section */}
        {metrics.length > 0 && (
          <div className="py-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-secondary mb-4">Chiffres clés</h2>
              <h3 className="text-3xl font-display font-bold text-slate-900">Notre Impact en chiffres</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {metrics.map((metric: any) => (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border border-slate-100 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-5xl font-display font-bold text-secondary mb-2">
                    {metric.value.toLocaleString("fr-FR")}{metric.suffix}
                  </div>
                  <div className="text-slate-900 font-bold mb-2">{metric.label}</div>
                  <p className="text-slate-500 text-xs leading-relaxed mb-3">{metric.description}</p>
                  {metric.sourceUrl && (
                    <a
                      href={metric.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-secondary/70 hover:text-secondary underline"
                    >
                      Source : {metric.sourceName}
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Research Sources Section */}
        {sources.length > 0 && (
          <div className="py-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-secondary mb-4">Références documentaires</h2>
              <h3 className="text-3xl font-display font-bold text-slate-900">Taafé Vision dans les médias</h3>
              <p className="text-slate-500 mt-4">Sources vérifiées utilisées pour documenter l'histoire et les activités de l'association.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {sources.map((source: any) => (
                <motion.div
                  key={source.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-slate-50 rounded-xl p-6 border border-slate-100 hover:border-secondary/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-secondary px-2 py-1 bg-secondary/10 rounded-full">
                      {source.topic}
                    </span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">{source.publishedAt}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2 leading-snug">{source.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">{source.summary}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">{source.sourceName} · {source.sourceType}</span>
                    <a
                      href={source.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-secondary font-bold hover:underline"
                    >
                      Lire →
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Social Links Section */}
        {socials.length > 0 && (
          <div className="bg-slate-900 rounded-3xl py-16 px-8 md:px-20 text-center">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-secondary mb-4">Suivez-nous</h2>
            <h3 className="text-3xl font-display font-bold text-white mb-10">Rejoignez la communauté Taafé Vision</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {socials.map((social: any) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-secondary text-white rounded-full font-bold transition-all duration-200 hover:scale-105"
                >
                  {SOCIAL_ICONS[social.platform] ?? null}
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Partenaires Section */}
        <div className="bg-primary/5 rounded-3xl py-16 px-8 md:px-16">
          <SectionHeader
            title="Nos Partenaires"
            subtitle="Taafé Vision collabore avec des organisations engagées pour l'égalité des femmes et les droits humains."
            centered
          />

          {partners && partners.length > 0 ? (
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-10 items-center justify-items-center"
            >
              {partners.map((partner) => (
                <motion.div
                  key={partner.id}
                  variants={item}
                  whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.2 } }}
                  className="w-full h-40 bg-white rounded-2xl shadow-lg border border-border/50 flex items-center justify-center p-8 group transition-all hover:shadow-2xl"
                >
                  <div className="text-center">
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="h-20 object-contain mx-auto mb-3 opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <h3 className="font-display font-bold text-primary text-sm">{partner.name}</h3>
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-secondary hover:underline mt-2 inline-block"
                      >
                        Visiter
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="mt-12 py-16 text-center bg-white rounded-xl border border-dashed border-border">
              <p className="text-muted-foreground text-lg">Partenaires en cours d'ajout...</p>
            </div>
          )}

          {/* Devenir Partenaire */}
          <div className="mt-16 bg-white rounded-3xl p-10 md:p-16 border border-border/50 shadow-lg">
            <h3 className="text-3xl font-display font-bold text-primary mb-6 text-center">Devenir Partenaire</h3>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed mb-8">
              Si votre organisation partage notre vision de promouvoir les droits des femmes à travers le cinéma,
              nous serions ravis de collaborer avec vous. Nous recherchons des partenaires pour nous aider à former,
              produire et diffuser des films qui font la différence.
            </p>
            <div className="text-center">
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-primary text-white rounded-full font-bold uppercase tracking-widest hover:bg-primary/90 transition-all"
              >
                Nous Contacter
              </a>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
