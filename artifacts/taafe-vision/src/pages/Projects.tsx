import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useProjects } from "@/hooks/use-projects";
import { Calendar, ArrowRight, Users, Film, Globe, Megaphone } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/api";

const CATEGORY_MAP: Record<string, { label: string; color: string; Icon: any }> = {
  "Elles se réalisent":            { label: "Formation", color: "bg-purple-100 text-purple-700", Icon: Users },
  "De l'idée au court métrage":   { label: "Incubation", color: "bg-blue-100 text-blue-700", Icon: Film },
  "Projections-débats communautaires": { label: "Sensibilisation", color: "bg-green-100 text-green-700", Icon: Megaphone },
  "Le genre s'invite au FESPACO": { label: "Événement", color: "bg-orange-100 text-orange-700", Icon: Globe },
  "16 jours d'activisme — Cinéma contre les VBG": { label: "Campagne", color: "bg-red-100 text-red-700", Icon: Megaphone },
  "Plaidoyer et réseautage féministe": { label: "Plaidoyer", color: "bg-slate-100 text-slate-700", Icon: Globe },
};

function statusBadge(date?: string | null) {
  if (!date) return null;
  const d = date.toLowerCase();
  if (d.includes("en cours")) return { label: "En cours", cls: "bg-secondary/10 text-secondary" };
  if (d.includes("annuel"))   return { label: "Annuel",   cls: "bg-blue-50 text-blue-600" };
  return null;
}

const IMAGES_BG: Record<string, string> = {
  "Elles se réalisent":            "#3b1a52",
  "De l'idée au court métrage":   "#1a3552",
  "Projections-débats communautaires": "#1a4032",
  "Le genre s'invite au FESPACO": "#52301a",
  "16 jours d'activisme — Cinéma contre les VBG": "#521a1a",
  "Plaidoyer et réseautage féministe": "#1a2a52",
};

export default function Projects() {
  const { projects, isLoading } = useProjects();

  const featured  = projects?.slice(0, 2) ?? [];
  const secondary = projects?.slice(2) ?? [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <div className="bg-slate-950 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #32cd32 0%, transparent 60%), radial-gradient(circle at 80% 20%, #561a44 0%, transparent 50%)" }}
        />
        <div className="container-wide relative z-10">
          <p className="text-secondary text-xs font-bold uppercase tracking-[0.4em] mb-4">Taafé Vision · Action sur le terrain</p>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 leading-none">
            NOS<br /><span className="text-secondary">PROGRAMMES</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Depuis 2017, Taafé Vision agit par la formation, la production, la diffusion et le plaidoyer pour transformer le cinéma burkinabè en levier d'égalité.
          </p>
          <div className="mt-10 flex gap-8 text-sm">
            {[
              { n: projects?.length ?? "—", l: "Programmes actifs" },
              { n: "6", l: "Promotions formées" },
              { n: "6 000+", l: "Personnes sensibilisées" },
            ].map(({ n, l }) => (
              <div key={l}>
                <p className="text-3xl font-display font-black text-secondary">{n}</p>
                <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Programs */}
      <div className="bg-white py-20">
        <div className="container-wide">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-12">Programmes phares</h2>

          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[0,1].map(i => (
                <div key={i} className="h-80 bg-slate-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {featured.map((project: Project, i: number) => {
                const cat = CATEGORY_MAP[project.title];
                const Icon = cat?.Icon ?? Film;
                const status = statusBadge(project.date);
                const bg = IMAGES_BG[project.title] ?? "#1a1a2e";
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
                  >
                    {/* Image area */}
                    <div className="relative h-56 overflow-hidden" style={{ backgroundColor: bg }}>
                      <img
                         src={project.imageUrl.startsWith("/images/") ? project.imageUrl : "/images/community-engagement-1.jpg"}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                         onError={(e) => {
                           const target = e.currentTarget;
                           target.onerror = null;
                           target.src = "/images/community-engagement-1.jpg";
                         }}
                      />
                      <div className="absolute inset-0 flex items-end p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          {cat && (
                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm bg-white/10 text-white border border-white/20`}>
                              {cat.label}
                            </span>
                          )}
                          {status && (
                            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-secondary text-white">
                              {status.label}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="flex-1 flex flex-col p-8 bg-white border border-t-0 border-slate-100 rounded-b-2xl">
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-widest mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        {project.date}
                      </div>
                      <h3 className="text-2xl font-display font-bold text-slate-900 mb-4 group-hover:text-secondary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed flex-1 text-sm">{project.description}</p>
                      <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                        <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-secondary hover:gap-3 transition-all">
                          En savoir plus <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* All other programs */}
      {secondary.length > 0 && (
        <div className="bg-slate-50 py-20">
          <div className="container-wide">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-12">Toutes nos initiatives</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondary.map((project: Project, i: number) => {
                const cat = CATEGORY_MAP[project.title];
                const Icon = cat?.Icon ?? Film;
                const status = statusBadge(project.date);
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="group bg-white rounded-xl p-6 border border-slate-100 hover:border-secondary/30 hover:shadow-md transition-all duration-200 flex flex-col gap-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                        <Icon className="w-5 h-5 text-secondary group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex gap-2 flex-wrap justify-end">
                        {cat && (
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${cat.color}`}>
                            {cat.label}
                          </span>
                        )}
                        {status && (
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${status.cls}`}>
                            {status.label}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">
                        <Calendar className="w-3 h-3" />
                        {project.date}
                      </div>
                      <h3 className="text-lg font-display font-bold text-slate-900 mb-2 group-hover:text-secondary transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{project.description}</p>
                    </div>

                    <button className="mt-auto flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-secondary hover:gap-2.5 transition-all pt-2 border-t border-slate-100">
                      Découvrir <ArrowRight className="w-3 h-3" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Axes stratégiques */}
      <div className="bg-slate-950 py-20">
        <div className="container-wide">
          <div className="max-w-2xl mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-4">Axes Stratégiques</h2>
            <h3 className="text-4xl font-display font-bold text-white mb-4">Comment nous agissons.</h3>
            <p className="text-slate-400 leading-relaxed">
              Trois axes structurent notre stratégie et guident l'ensemble de nos programmes jusqu'en 2030.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "01", title: "Production & Diffusion", desc: "Produire et diffuser des films réalisés par des femmes, exempts de stéréotypes de genre, et soutenir leur circulation dans les festivals et les communautés." },
              { n: "02", title: "Promotion par le cinéma", desc: "Utiliser le film comme outil de plaidoyer pour les droits des femmes, sensibiliser les communautés aux violences basées sur le genre et promouvoir l'égalité." },
              { n: "03", title: "Capacités techniques", desc: "Renforcer les compétences organisationnelles, techniques et artistiques de Taafé Vision et de ses membres pour pérenniser l'impact." }
            ].map((axe) => (
              <motion.div
                key={axe.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 bg-white/5 border border-white/10 rounded-xl hover:border-secondary/40 hover:bg-white/8 transition-all"
              >
                <span className="text-5xl font-display font-black text-secondary/40 block mb-4">{axe.n}</span>
                <h4 className="text-xl font-display font-bold text-white mb-3">{axe.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{axe.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
