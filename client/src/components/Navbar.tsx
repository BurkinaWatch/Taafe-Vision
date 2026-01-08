import { Link, useLocation } from "wouter";
import { Menu, X, Facebook, Instagram, MessageCircle, Youtube } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SiTiktok } from "react-icons/si";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Accueil" },
    { href: "/about", label: "À propos" },
    { href: "/projects", label: "Projets" },
    { href: "/films", label: "Films" },
    { href: "/trainings", label: "Formations" },
    { href: "/news", label: "Actualités" },
    { href: "/partners", label: "Partenaires" },
    { href: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/taafevision", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/taafevision", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com/@taafevision", label: "Youtube" },
    { icon: SiTiktok, href: "https://tiktok.com/@taafevision", label: "Tiktok" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#e5e7eb] border-b border-slate-300 shadow-sm">
      <div className="container-wide py-2 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src="/images/logo.jpg" 
            alt="Taafé Vision Logo" 
            className="w-14 h-14 rounded-full object-cover border-2 border-[#86efac] shadow-sm transition-transform group-hover:scale-105" 
          />
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-serif font-bold text-slate-900 tracking-tight">Taafé Vision</span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.1em] text-slate-400 font-bold whitespace-nowrap">CINÉMA & DROITS DES FEMMES</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 ml-auto">
          <div className="flex items-center">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={cn(
                "px-3 py-2 text-[11px] uppercase tracking-wider font-bold transition-all whitespace-nowrap",
                location === link.href ? "text-[#86efac]" : "text-slate-500 hover:text-slate-900"
              )}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 pl-6 border-l border-slate-300">
            {socialLinks.map((social) => (
              <a 
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#86efac] transition-colors p-1"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-slate-600" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col p-6 space-y-4">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={cn(
                  "text-lg font-display py-2 border-b border-border/50",
                  location === link.href ? "text-secondary" : "text-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-6 pt-4 justify-center">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-secondary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
