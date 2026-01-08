import { Link, useLocation } from "wouter";
import { Menu, X, Facebook, Instagram, Youtube, Search, Moon, Sun, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SiTiktok } from "react-icons/si";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [isDark, setIsDark] = useState(false);

  const links = [
    { href: "/", label: "Accueil" },
    { href: "/news", label: "Blog" },
    { href: "/about", label: "À propos" },
    { href: "/projects", label: "Projets" },
    { href: "/films", label: "Films" },
    { href: "/trainings", label: "Formations" },
    { href: "/partners", label: "Partenaires" },
    { href: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/taafevision", label: "Facebook" },
    { icon: Youtube, href: "https://youtube.com/@taafevision", label: "Youtube" },
    { icon: Instagram, href: "https://instagram.com/taafevision", label: "Instagram" },
    { icon: SiTiktok, href: "https://tiktok.com/@taafevision", label: "Tiktok" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-slate-100">
      {/* Top Bar: Minimal Links + Date + Mode Toggle */}
      <div className="bg-slate-50 border-b border-slate-200 py-1.5 hidden lg:block">
        <div className="container-wide flex items-center justify-between">
          <div className="flex items-center gap-4 text-[10px] uppercase font-bold text-slate-500 tracking-widest">
            <Link href="/about" className="hover:text-slate-900 transition-colors">À propos</Link>
            <Link href="/contact" className="hover:text-slate-900 transition-colors">Contact</Link>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              {format(new Date(), "EEEE d MMMM yyyy", { locale: fr })}
            </span>
            <button 
              onClick={() => setIsDark(!isDark)}
              className="w-10 h-5 bg-slate-200 rounded-full relative transition-colors flex items-center px-1"
            >
              <div className={cn(
                "w-3.5 h-3.5 bg-white rounded-full shadow-sm flex items-center justify-center transition-transform",
                isDark ? "translate-x-4.5" : "translate-x-0"
              )}>
                {isDark ? <Moon className="w-2 h-2 text-slate-400" /> : <Sun className="w-2 h-2 text-slate-400" />}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Middle Bar: Menu Toggle + Logo + Search + Social */}
      <div className="bg-white py-4 lg:py-8">
        <div className="container-wide flex items-center justify-between gap-4 lg:gap-8">
          {/* Left: Mobile Menu Toggle */}
          <button 
            className="p-2 text-slate-600 lg:hidden" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <div className="hidden lg:block w-20">
             <button className="text-slate-400 hover:text-slate-900 transition-colors">
                <Menu className="w-8 h-8" />
             </button>
          </div>

          {/* Center: Logo */}
          <Link href="/" className="flex flex-col items-center gap-1 flex-1 group">
             <div className="flex items-center gap-2 lg:gap-6">
                <span className="text-3xl lg:text-7xl font-serif font-black text-slate-900 tracking-tighter uppercase">TAAFÉ</span>
                <img 
                  src="/images/logo.jpg" 
                  alt="Taafé Vision Logo" 
                  className="w-12 h-12 lg:w-24 lg:h-24 rounded-full object-cover border-2 lg:border-4 border-[#86efac] shadow-md transition-transform group-hover:scale-105" 
                />
                <span className="text-3xl lg:text-7xl font-serif font-black text-slate-900 tracking-tighter uppercase">VISION</span>
             </div>
             <span className="text-[7px] lg:text-xs font-black uppercase tracking-[0.3em] lg:tracking-[0.5em] text-slate-400 mt-1 lg:mt-2">CINÉMA & DROITS DES FEMMES</span>
          </Link>

          {/* Right: Search + Social Icons */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Recherche..." 
                className="bg-slate-50 border-none rounded-full px-4 py-2 text-[10px] w-40 focus:ring-1 focus:ring-slate-200 transition-all placeholder:text-slate-400 font-bold uppercase tracking-wider"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
            </div>
            
            <div className="flex items-center gap-1.5">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#5a1a4a] text-white w-8 h-8 flex items-center justify-center rounded-sm hover:bg-[#86efac] hover:text-[#5a1a4a] transition-all shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Mobile Search Icon */}
          <button className="p-2 text-slate-600 lg:hidden">
             <Search className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Bottom Bar: Navigation Menu */}
      <div className="bg-[#5a1a4a] hidden lg:block border-t border-white/5">
        <div className="container-wide flex items-center justify-between h-14">
          <div className="flex items-center h-full">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={cn(
                  "px-6 h-full flex items-center text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group",
                  location === link.href 
                    ? "bg-[#7d2466] text-white" 
                    : "text-white/80 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <Link 
            href="/contact" 
            className="border border-white/30 px-6 py-2 rounded-sm text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-[#5a1a4a] transition-all flex items-center gap-2"
          >
            <Mail className="w-3.5 h-3.5" />
            RÉSERVEZ VOTRE PLACE
          </Link>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[70px] lg:top-[80px] z-[60] bg-white animate-in slide-in-from-top-2 overflow-y-auto">
          <div className="flex flex-col p-8 space-y-6">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={cn(
                  "text-xl font-display font-black uppercase tracking-widest border-b border-slate-100 pb-4",
                  location === link.href ? "text-secondary" : "text-slate-900"
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
                    className="bg-[#5a1a4a] text-white w-12 h-12 flex items-center justify-center rounded-sm shadow-md"
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                {format(new Date(), "EEEE d MMMM yyyy", { locale: fr })}
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
