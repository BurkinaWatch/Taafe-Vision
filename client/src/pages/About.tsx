import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <div className="bg-slate-950 py-32 text-white">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">ASSOCIATION <br /> TAAFE VISION</h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Une organisation féministe, apolitique et laïque qui milite pour une représentativité plus significative de la femme dans l’industrie cinématographique.
            </p>
          </div>
        </div>
      </div>

      <div className="container-wide py-24 space-y-24">
        
        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src="/images/community-engagement-1.jpg" 
              alt="Woman Filmmaker" 
              className="rounded-lg shadow-2xl relative z-10"
            />
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-secondary/10 rounded-lg -z-0" />
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-secondary mb-4">Notre Histoire</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                En 2016, un groupe de femmes professionnelles du cinéma et de l’audiovisuel font un constat alarmant : insuffisance de femmes sur les plateaux, persistance des stéréotypes et manque de rôles valorisants. C’est ainsi qu’est née « Taafé Vision », qui signifie en langue bambara « Vision de femmes ».
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900">Une Mission Claire</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Produire et diffuser des films exempts de stéréotypes de genre qui soutiennent l’abandon de toutes sortes de violences basées sur le genre.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900">Une Vision Ambitieuse</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  D'ici 2030, être une association leader dans la lutte pour un monde plus égalitaire et juste au moyen du film.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-24 border-y border-slate-100">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Nos Valeurs nous distinguent</h2>
            <p className="text-slate-500 uppercase tracking-widest text-xs font-bold">Principes fondamentaux de notre combat féministe</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { title: "Dignité", desc: "Respect de la personne humaine." },
              { title: "Responsabilité", desc: "Engagement envers nos actions." },
              { title: "Intersectionnalité", desc: "Prise en compte des identités." },
              { title: "Autonomie", desc: "Indépendance et liberté d'action." },
              { title: "Egalité", desc: "Justice sociale pour toutes." }
            ].map((value) => (
              <div key={value.title} className="text-center group p-6 rounded-xl hover:bg-slate-50 transition-colors">
                <h4 className="text-xl font-display font-bold text-slate-900 mb-2 group-hover:text-secondary transition-colors">{value.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
