import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { usePartners } from "@/hooks/use-partners";
import { motion } from "framer-motion";

export default function Partners() {
  const { partners } = usePartners();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-primary/5 py-24 pt-32">
        <div className="container-wide">
          <SectionHeader 
            title="Nos Partenaires" 
            subtitle="Taafé Vision collabore avec des organisations engagées pour l'égalité des femmes et les droits humains."
            centered
          />

          {partners && partners.length > 0 ? (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-12 items-center justify-items-center"
            >
              {partners.map((partner) => (
                <motion.div 
                  key={partner.id}
                  variants={item}
                  whileHover={{ 
                    scale: 1.05,
                    y: -10,
                    transition: { duration: 0.2 }
                  }}
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
            <div className="mt-16 py-20 text-center bg-white rounded-xl border border-dashed border-border">
              <p className="text-muted-foreground text-lg">Partenaires en cours d'ajout...</p>
            </div>
          )}

          {/* Partnership Section */}
          <div className="mt-20 bg-white rounded-3xl p-12 md:p-20 border border-border/50 shadow-lg">
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
