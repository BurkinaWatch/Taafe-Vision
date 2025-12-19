import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useArticles } from "@/hooks/use-articles";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export default function News() {
  const { articles } = useArticles();

  const newsItems = articles?.filter(a => a.category === 'news') || [];
  const eventItems = articles?.filter(a => a.category === 'event') || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-primary/5 py-24 pt-32">
        <div className="container-wide">
          <SectionHeader 
            title="Actualités & Événements" 
            subtitle="Suivez nos dernières actualités et participez à nos événements."
            centered
          />

          {/* News Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-display font-bold text-primary mb-8">Actualités</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {newsItems.length > 0 ? (
                newsItems.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    {item.imageUrl && (
                      <div className="h-48 overflow-hidden bg-gray-800">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                          onError={(e) => { e.currentTarget.src = "/images/community-screening.jpg"; }}
                        />
                      </div>
                    )}
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="w-4 h-4" />
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString('fr-FR') : 'Aujourd\'hui'}
                      </div>
                      <h3 className="text-2xl font-display font-bold text-primary mb-4">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed flex-1">{item.content}</p>
                      <div className="mt-6 pt-6 border-t border-border">
                        <a href="#" className="text-primary font-bold text-sm uppercase tracking-widest hover:text-secondary transition-colors flex items-center gap-2">
                          Lire la suite <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-muted-foreground bg-white rounded-xl border border-dashed border-border">
                  <p>Pas d'actualités pour le moment. Revenez bientôt!</p>
                </div>
              )}
            </div>
          </div>

          {/* Events Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-display font-bold text-primary mb-8">Événements</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {eventItems.length > 0 ? (
                eventItems.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg border border-secondary/20 hover:shadow-xl transition-all duration-300 flex flex-col border-l-4 border-l-secondary"
                  >
                    {item.imageUrl && (
                      <div className="h-48 overflow-hidden bg-gray-800">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                          onError={(e) => { e.currentTarget.src = "/images/community-screening.jpg"; }}
                        />
                      </div>
                    )}
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-sm text-secondary font-bold mb-3 uppercase tracking-widest">
                        <MapPin className="w-4 h-4" />
                        Événement
                      </div>
                      <h3 className="text-2xl font-display font-bold text-primary mb-4">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed flex-1">{item.content}</p>
                      <div className="mt-6 pt-6 border-t border-border">
                        <a href="#" className="text-secondary font-bold text-sm uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2">
                          Plus d'infos <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-muted-foreground bg-white rounded-xl border border-dashed border-border">
                  <p>Pas d'événements programmés pour le moment. À bientôt!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
