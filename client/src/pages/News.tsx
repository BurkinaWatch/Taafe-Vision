import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Article } from "@shared/schema";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function News() {
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  const categories = [
    { id: "all", label: "Tous" },
    { id: "news", label: "Actualités" },
    { id: "event", label: "Événements" },
    { id: "training", label: "Formations" },
  ];

  const filteredArticles = articles?.filter(article => 
    activeCategory === "all" || article.category === activeCategory
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* Header Section */}
        <section className="bg-slate-50 py-20">
          <div className="container-wide text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6"
            >
              Notre Blog
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 leading-relaxed"
            >
              Découvrez nos articles sur l'égalité des sexes, l'autonomisation des femmes et nos actions au Burkina Faso.
            </motion.p>
          </div>
        </section>

        {/* Filter Section */}
        <div className="container-wide py-12 border-b border-slate-100">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase transition-all",
                  activeCategory === cat.id
                    ? "bg-[#86efac] text-slate-900 shadow-lg"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <section className="container-wide py-20">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse space-y-4">
                  <div className="bg-slate-100 aspect-[4/3] rounded-2xl" />
                  <div className="h-4 bg-slate-100 rounded w-1/4" />
                  <div className="h-8 bg-slate-100 rounded w-3/4" />
                  <div className="h-20 bg-slate-100 rounded w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredArticles?.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6 shadow-md transition-shadow group-hover:shadow-xl">
                    <img 
                      src={article.imageUrl || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop"} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#86efac] text-slate-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-slate-400 text-sm font-medium">
                      Par Taafé Vision, {article.createdAt ? format(new Date(article.createdAt), "d MMMM yyyy", { locale: fr }) : ""}
                    </div>
                    <h2 className="text-2xl font-display font-bold text-slate-900 group-hover:text-secondary transition-colors line-clamp-2 leading-tight">
                      {article.title}
                    </h2>
                    <p className="text-slate-600 line-clamp-3 leading-relaxed">
                      {article.content}
                    </p>
                    <div className="pt-2">
                      <span className="text-secondary font-bold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                        Lire la suite <span className="text-xl">→</span>
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {!isLoading && filteredArticles?.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 text-xl">Aucun article trouvé dans cette catégorie.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
