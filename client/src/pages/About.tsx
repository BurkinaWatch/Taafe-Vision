import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <div className="bg-slate-950 py-32 text-white">
        <div className="container-wide">
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
        <div className="bg-slate-50 rounded-3xl p-12 md:p-20">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-6">Axes Stratégiques</h2>
            <p className="text-slate-600 text-lg">
              La réalisation de notre vision passe par trois enjeux majeurs de développement :
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                axe: "Axe 1", 
                title: "Production & Diffusion", 
                desc: "Renforcement de la production et de la diffusion de films réalisés par les femmes." 
              },
              { 
                axe: "Axe 2", 
                title: "Promotion de la femme", 
                desc: "Promotion de la femme au travers du cinéma." 
              },
              { 
                axe: "Axe 3", 
                title: "Capacités techniques", 
                desc: "Renforcement des capacités techniques et organisationnelles de Taafé Vision." 
              }
            ].map((axe) => (
              <div key={axe.axe} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                <span className="text-secondary font-bold text-sm tracking-widest uppercase">{axe.axe}</span>
                <h4 className="text-xl font-bold text-slate-900">{axe.title}</h4>
                <p className="text-slate-600 leading-relaxed">{axe.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
