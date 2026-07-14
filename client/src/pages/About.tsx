import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { usePartners } from "@/hooks/use-partners";
import logoImg from "@assets/WhatsApp_Image_2026-01-06_at_21.59.54_1767830805032.jpeg";

export default function About() {
  const { partners } = usePartners();

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
              <h3 className="text-3xl font-display font-bold text-slate-900 mb-6">Il était une fois...</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                En 2016, un groupe de femmes professionnelles du cinéma et de l’audiovisuel font les constats suivants : 
              </p>
              <ul className="space-y-3 text-slate-600 list-disc pl-5 mb-8">
                <li>Insuffisance de femmes sur les plateaux de tournages</li>
                <li>Les femmes sont moins nombreuses dans le domaine du cinéma</li>
                <li>Persistance des films stéréotypant</li>
                <li>Peu de rôles valorisants de l’image de la femme</li>
              </ul>
              <p className="text-lg text-slate-700 leading-relaxed">
                C’est ainsi qu’un groupe d’ami.es professionnel.les et amateur.rices du cinéma qui travaillaient ensemble depuis quelques années, ont décidé de créer une association dénommée « Taafé Vision » pour formaliser les activités de ce groupe de personnes et oeuvrer à la promotion du cinéma au féminin.
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="/images/community-engagement-1.jpg" 
              alt="Association Taafé Vision" 
              className="rounded-lg shadow-2xl relative z-10 w-full"
            />
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-secondary/10 rounded-lg -z-0" />
            <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-slate-700 leading-relaxed italic">
                « Taafé » signifie en langue bambara le pagne. Le pagne symbolisant la femme au Burkina Faso, Taafé Vision signifie littéralement « Vision de femmes ».
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-slate-900 text-white p-12 rounded-2xl space-y-6">
            <h3 className="text-2xl font-display font-bold text-secondary">Notre Mission</h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              Produire et diffuser des films exempts de stéréotypes du genre et qui soutiennent l’abandon de toutes sortes de violences basées sur le genre tout en contribuant à la promotion de la femme dans un monde plus juste, plus égalitaire.
            </p>
          </div>
          <div className="bg-secondary text-white p-12 rounded-2xl space-y-6">
            <h3 className="text-2xl font-display font-bold">Notre Vision</h3>
            <p className="text-white/90 text-lg leading-relaxed">
              À l’orée de 2030, être une association leader dans la lutte pour un monde plus égalitaire, plus juste et exempt de toute forme de violence à l’égard de la femme, au moyen du film.
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
