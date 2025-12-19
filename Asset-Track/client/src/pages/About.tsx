import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <div className="bg-primary py-24 text-white text-center">
        <div className="container-wide">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Notre Histoire</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">Depuis 2017, une association apolitique et laïque engagée pour les droits des femmes dans le cinéma.</p>
        </div>
      </div>

      <div className="container-wide py-24 space-y-24">
        
        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1485095329183-d0ddc3500664?q=80&w=1000&auto=format&fit=crop" 
              alt="Woman Filmmaker" 
              className="rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
            />
          </div>
          <div className="space-y-6">
            <SectionHeader title="Notre Mission" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Taafé Vision milite pour une représentativité plus significative des femmes dans l'industrie cinématographique et audiovisuelle. 
              Notre objectif est de défendre les droits des femmes à travers la création de films sans stéréotypes.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nous abordons des sujets écrits par des femmes pour sensibiliser à des thèmes essentiels comme les violences basées sur le genre. 
              Le cinéma est notre outil de promotion et de diffusion des droits de la femme dans nos sociétés.
            </p>
          </div>
        </div>

        {/* Leadership Section */}
        <div className="bg-muted/30 rounded-3xl p-12 md:p-20 border border-border/50">
          <SectionHeader title="Leadership & Fondation" centered />
          
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 mb-16">
             <div className="w-64 h-64 shrink-0 relative">
               <div className="absolute inset-0 bg-secondary rounded-full transform translate-x-2 translate-y-2" />
               <img 
                 src="/images/azaratou.png" 
                 alt="Azaratou Bancé" 
                 className="w-full h-full object-cover rounded-full relative z-10 border-4 border-white shadow-xl"
               />
             </div>
             <div className="text-center md:text-left space-y-4">
               <h3 className="text-3xl font-display font-bold text-primary">Azaratou Bancé</h3>
               <p className="text-secondary font-bold uppercase tracking-widest text-sm">Présidente & Fondatrice</p>
               <p className="text-muted-foreground italic text-lg">
                 "Le cinéma est un outil puissant de changement. Quand les femmes tiennent la caméra, elles racontent des histoires qui guérissent, inspirent et transforment nos sociétés."
               </p>
               <div className="pt-4 space-y-2 text-sm text-muted-foreground">
                 <p><strong>Association fondée:</strong> 2017</p>
                 <p><strong>Statut:</strong> Association à but non lucratif, apolitique et laïque</p>
                 <p><strong>Localisation:</strong> Ouagadougou, Burkina Faso</p>
               </div>
             </div>
          </div>

          {/* Values Section */}
          <div className="grid md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-border">
            <div className="text-center space-y-3">
              <h4 className="text-xl font-display font-bold text-primary">Apolitique & Laïque</h4>
              <p className="text-muted-foreground text-sm">Notre action transcende les clivages politiques et religieux pour servir l'égalité.</p>
            </div>
            <div className="text-center space-y-3">
              <h4 className="text-xl font-display font-bold text-primary">Sans Stéréotypes</h4>
              <p className="text-muted-foreground text-sm">Nous créons des films authentiques qui déconstruisent les idées reçues sur les femmes.</p>
            </div>
            <div className="text-center space-y-3">
              <h4 className="text-xl font-display font-bold text-primary">Transformateur</h4>
              <p className="text-muted-foreground text-sm">Chaque film est un acte de sensibilisation pour changer les mentalités et sociétés.</p>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
