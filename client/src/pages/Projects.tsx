import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useProjects } from "@/hooks/use-projects";
import { Calendar } from "lucide-react";

export default function Projects() {
  const { projects, isLoading } = useProjects();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-primary/5 py-24">
        <div className="container-wide">
          <SectionHeader title="Nos Projets" subtitle="Des initiatives pour le changement." />

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
                      <Calendar className="w-3 h-3" /> {project.date || "Ongoing"}
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

      <Footer />
    </div>
  );
}
