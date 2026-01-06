import { Link, useLocation } from "wouter";
import { Menu, X, Facebook, Instagram, MessageCircle } from "lucide-react";
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
    { icon: MessageCircle, href: "https://wa.me/22600000000", label: "WhatsApp" },
    { icon: SiTiktok, href: "https://tiktok.com/@taafevision", label: "Tiktok" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-sm transition-all duration-300">
      <div className="container-wide py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold font-display text-slate-900 flex items-center gap-4 group transition-transform hover:scale-[1.02]">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-tr from-[#f146ad] to-[#39cd15] rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity" />
            <img src="/images/logo.jpg" alt="Taafé Vision Logo" className="relative w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm transition-all group-hover:border-[#f146ad]" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="tracking-tight font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">Taafé Vision</span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-slate-500 font-bold mt-0.5">Cinéma & Droits Humains</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center flex-1 justify-end gap-10">
          <div className="flex items-center gap-8 border-r border-slate-200/60 pr-10">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={cn(
                "text-[11px] uppercase tracking-[0.2em] font-bold transition-all relative group/link",
                location === link.href ? "text-[#f146ad]" : "text-slate-600 hover:text-slate-900"
              )}>
                {link.label}
                <span className={cn(
                  "absolute -bottom-1.5 left-0 h-0.5 bg-[#f146ad] transition-all duration-300",
                  location === link.href ? "w-full" : "w-0 group-hover/link:w-full"
                )} />
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a 
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 hover:text-white hover:bg-slate-900 transition-all duration-300 transform hover:-translate-y-1"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-primary" 
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
