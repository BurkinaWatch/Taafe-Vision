import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useProjects } from "@/hooks/use-projects";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function Projects() {
  const { projects, isLoading } = useProjects();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-slate-50 py-24">
        <div className="container-wide">
          <SectionHeader title="Nos Programmes" subtitle="Découvrez nos initiatives concrètes sur le terrain." />

          {isLoading ? (
            <div className="text-center py-20">Chargement des projets...</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12">
              {projects?.map((project) => (
                <div key={project.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="h-64 overflow-hidden relative bg-gray-800">
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      onError={(e) => { e.currentTarget.src = "/images/community-screening.jpg"; }}
                    />
                    <div className="absolute top-4 left-4 bg-secondary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-sm">
                      <Calendar className="w-3 h-3" /> {project.date || "2024"}
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-display font-bold mb-4 text-primary group-hover:text-secondary transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground leading-relaxed flex-1">{project.description}</p>
                    <div className="mt-8 pt-6 border-t border-border">
                      <button className="text-primary font-bold text-sm uppercase tracking-widest hover:text-secondary transition-colors">
                        En Savoir Plus →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {!projects?.length && (
                <div className="col-span-full py-20 text-center text-muted-foreground">
                  <p>Pas de projets listés pour le moment.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white py-24">
        <div className="container-wide">
          <div className="max-w-4xl mb-20">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-secondary mb-4">Axes Stratégiques</h2>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-8">Comment nous agissons.</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Pour réaliser notre vision, nous avons défini trois axes stratégiques cohérents correspondant aux principaux enjeux de notre développement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                title: "Renforcement de la production", 
                desc: "Produire et diffuser des films réalisés par les femmes pour amplifier leurs voix.",
                icon: "01"
              },
              { 
                title: "Promotion par le cinéma", 
                desc: "Utiliser le film comme outil de plaidoyer pour les droits de la femme.",
                icon: "02"
              },
              { 
                title: "Capacités techniques", 
                desc: "Renforcer les compétences organisationnelles et techniques de Taafé Vision.",
                icon: "03"
              }
            ].map((axe, index) => (
              <motion.div 
                key={axe.icon}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group p-10 bg-slate-950 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 border border-white/5 hover:border-secondary/30"
              >
                <span className="text-6xl font-display font-bold text-secondary transition-colors block mb-2">{axe.icon}</span>
                <h3 className="text-2xl font-display font-bold mt-6 mb-4 text-white group-hover:text-secondary active:text-secondary transition-colors">{axe.title}</h3>
                <p className="text-slate-400 transition-colors leading-relaxed">{axe.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
