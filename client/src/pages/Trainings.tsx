import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { BookOpen, Users, Award, Zap, Lightbulb } from "lucide-react";

export default function Trainings() {
  const trainings = [
    {
      id: 1,
      title: "Écriture Cinématographique",
      description: "Développez vos compétences en écriture de scénarios et en développement d'histoires. Apprenez à écrire des films sans stéréotypes qui abordent des enjeux sociaux importants.",
      duration: "8 semaines",
      icon: BookOpen,
    },
    {
      id: 2,
      title: "Réalisation de Courts-Métrages",
      description: "Formation complète en réalisation : de la préproduction à la post-production. Accompagnement personnalisé pour transformer vos idées en films.",
      duration: "12 semaines",
      icon: Zap,
    },
    {
      id: 3,
      title: "Production & Diffusion",
      description: "Maîtrisez les aspects techniques et administratifs de la production filmique. Apprenez à gérer un projet de sa conception à sa distribution.",
      duration: "10 semaines",
      icon: Award,
    },
    {
      id: 4,
      title: "Sensibilisation Cinéma & Droits",
      description: "Utilisez le cinéma comme outil de sensibilisation. Formations sur la théâtralisation, les projections communautaires et l'engagement social.",
      duration: "6 semaines",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Background Pattern Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-[5%] w-12 h-12 bg-primary/5 rounded-lg rotate-12 animate-pulse" />
        <div className="absolute top-40 right-[10%] w-24 h-24 bg-secondary/5 rounded-full -rotate-12" />
        <div className="absolute bottom-1/3 left-[8%] w-16 h-16 bg-primary/10 rounded-xl rotate-45" />
        <div className="absolute top-1/2 right-[5%] w-20 h-20 bg-secondary/10 rounded-lg -rotate-45 animate-bounce [animation-duration:8s]" />
      </div>

      <div className="bg-primary/5 py-24 pt-32 relative z-10">
        <div className="container-wide">
          <SectionHeader 
            title="Formations & Accompagnement" 
            subtitle="Programmes complets pour les femmes désireuses de faire carrière dans le cinéma et l'audiovisuel."
            centered
          />

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {trainings.map((training) => {
              const Icon = training.icon;
              return (
                <div 
                  key={training.id}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6 text-secondary">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-primary mb-4">{training.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-1">{training.description}</p>
                  <div className="pt-6 border-t border-border">
                    <p className="text-sm font-bold text-secondary uppercase tracking-widest">Durée: {training.duration}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-20 bg-primary rounded-3xl p-12 md:p-20 text-white text-center">
            <h3 className="text-3xl font-display font-bold mb-6">Projet "Elles se réalisent"</h3>
            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              Notre programme phare offre une formation intégrée et un accompagnement personnalisé pour les femmes réalisatrices. 
              Les participantes bénéficient d'une formation théorique et pratique, d'un mentorat avec des professionnelles du cinéma, 
              et d'une aide à la production de leurs propres courts-métrages.
            </p>
            <div className="mt-8">
              <button className="px-8 py-4 bg-secondary text-white rounded-full font-bold uppercase tracking-widest hover:bg-secondary/90 transition-all">
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
