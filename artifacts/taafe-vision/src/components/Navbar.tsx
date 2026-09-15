import { Link, useLocation } from "wouter";
import { Menu, X, Facebook, Instagram, Youtube, Search, Moon, Sun, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SiTiktok } from "react-icons/si";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { SearchModal } from "@/components/SearchModal";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [logoOpen, setLogoOpen] = useState(false);
  const [location] = useLocation();
  const [isDark, setIsDark] = useState(false);

  const links = [
    { href: "/", label: "Accueil" },
    { href: "/news", label: "Blog" },
    { href: "/projects", label: "Projets" },
    { href: "/films", label: "Films" },
    { href: "/festival/16-films-une-cause", label: "Festival" },
    { href: "/trainings", label: "Formations" },
    { href: "/about", label: "À propos" },
    { href: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/taafevision", label: "Facebook" },
    { icon: Youtube, href: "https://youtube.com/@taafevision", label: "Youtube" },
    { icon: Instagram, href: "https://instagram.com/taafevision", label: "Instagram" },
    { icon: SiTiktok, href: "https://tiktok.com/@taafevision", label: "Tiktok" },
  ];

  return (
    <nav aria-label="Navigation principale" className="fixed left-0 right-0 top-0 z-50 border-b border-border/70 bg-card/95 shadow-sm backdrop-blur-md">
      {/* Top Bar: Minimal Links + Date + Mode Toggle */}
      <div className="bg-muted/45 border-b border-border/60 py-1.5 hidden lg:block">
        <div className="container-wide flex items-center justify-between">
          <div className="flex items-center gap-4 text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
            <Link href="/about" className="hover:text-foreground transition-colors">À propos</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
          <div className="flex items-center gap-6">
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              {format(new Date(), "EEEE d MMMM yyyy", { locale: fr })}
            </span>
              <button
               type="button"
               aria-label={isDark ? "Activer le thème clair" : "Activer le thème sombre"}
               aria-pressed={isDark}
              onClick={() => setIsDark(!isDark)}
               className="relative flex h-6 w-11 items-center rounded-full bg-muted px-1 transition-colors hover:bg-border"
            >
              <div className={cn(
                 "flex h-4 w-4 items-center justify-center rounded-full bg-card shadow-sm transition-transform",
                 isDark ? "translate-x-5" : "translate-x-0"
              )}>
                 {isDark ? <Moon className="h-2.5 w-2.5 text-muted-foreground" /> : <Sun className="h-2.5 w-2.5 text-muted-foreground" />}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Middle Bar: Menu Toggle + Logo + Search + Social */}
       <div className="bg-card py-1.5 lg:py-2">
        <div className="container-wide flex items-center justify-between gap-4 lg:gap-6">
          {/* Left: Mobile Menu Toggle */}
          <button 
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            className="rounded-lg p-2 text-foreground/70 transition-colors hover:bg-muted hover:text-foreground lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <div className="hidden lg:block w-16">
              <button type="button" aria-label="Afficher le menu" className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                <Menu className="w-5 h-5" />
             </button>
          </div>

          {/* Center: Logo */}
          <Link href="/" className="flex flex-col items-center flex-1 group">
              <div className="flex items-center gap-2 lg:gap-3">
                 <span className="text-2xl lg:text-3xl font-serif font-black text-foreground tracking-tighter uppercase">TAAFÉ</span>
                <img 
                  src="/images/taafe-vision-logo-clean.png" 
                  alt="Taafé Vision Logo" 
                   className="h-8 w-8 cursor-zoom-in rounded-full border-2 border-secondary object-cover shadow-sm transition-transform group-hover:scale-105 lg:h-10 lg:w-10"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLogoOpen(true); }}
                />
                 <span className="text-2xl lg:text-3xl font-serif font-black text-foreground tracking-tighter uppercase">VISION</span>
             </div>
              <span className="text-[6px] lg:text-[9px] font-black uppercase tracking-[0.3em] lg:tracking-[0.4em] text-muted-foreground">CINÉMA & DROITS DES FEMMES</span>
          </Link>

          {/* Right: Search + Social Icons */}
          <div className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => setSearchOpen(true)}
              className="group relative flex w-44 items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground transition-all hover:border-primary/30 hover:bg-muted"
            >
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span className="flex-1 text-left">Recherche…</span>
              <kbd className="hidden rounded border border-border bg-card px-1 py-0.5 font-mono text-[8px] text-muted-foreground group-hover:inline">⌘K</kbd>
            </button>
            
            <div className="flex items-center gap-1.5">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                   className="bg-foreground text-background w-8 h-8 flex items-center justify-center rounded-xl hover:bg-primary hover:text-primary-foreground transition-all shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Mobile Search Icon */}
          <button
             aria-label="Rechercher"
             className="rounded-lg p-2 text-foreground/70 transition-colors hover:bg-muted hover:text-foreground lg:hidden"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Bottom Bar: Navigation Menu */}
      <div className="bg-foreground hidden lg:block border-t border-background/10">
        <div className="container-wide flex items-center justify-between h-14">
          <div className="flex items-center h-full">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={cn(
                  "px-6 h-full flex items-center text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group",
                  location === link.href 
                     ? "bg-primary text-primary-foreground" 
                     : "text-background/80 hover:text-background"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <Link 
            href="/contact" 
               className="border border-background/35 px-6 py-2 rounded-full text-background text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all flex items-center gap-2"
          >
            <Mail className="w-3.5 h-3.5" />
            RÉSERVEZ VOTRE PLACE
          </Link>
        </div>
      </div>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />

      {/* Mobile Nav Menu */}
      {isOpen && (
         <div className="lg:hidden fixed inset-0 top-[70px] lg:top-[80px] z-[60] bg-card animate-in slide-in-from-top-2 overflow-y-auto">
          <div className="flex flex-col p-8 space-y-6">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={cn(
                   "text-xl font-display font-black uppercase tracking-widest border-b border-border pb-4",
                   location === link.href ? "text-primary" : "text-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-8 flex flex-col gap-6 items-center">
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a 
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                   className="bg-foreground text-background w-12 h-12 flex items-center justify-center rounded-2xl shadow-md"
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                {format(new Date(), "EEEE d MMMM yyyy", { locale: fr })}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Logo Lightbox */}
      {logoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setLogoOpen(false)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src="/images/taafe-vision-logo-clean.png"
              alt="Taafé Vision Logo"
              className="max-w-[80vw] max-h-[80vh] rounded-2xl shadow-2xl object-contain"
            />
            <button
              onClick={() => setLogoOpen(false)}
             className="absolute -top-3 -right-3 w-8 h-8 bg-card rounded-full flex items-center justify-center shadow-lg text-foreground hover:text-primary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
