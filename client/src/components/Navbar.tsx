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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
      <div className="container-wide py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold font-display text-slate-900 flex items-center gap-4 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-tr from-secondary/40 to-primary/40 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            <img src="/images/logo.jpg" alt="Taafé Vision Logo" className="relative w-14 h-14 rounded-full object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="tracking-tighter text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-primary to-slate-900 group-hover:from-primary group-hover:to-secondary transition-all">TAAFÉ VISION</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-[1px] w-4 bg-secondary/60" />
              <span className="text-[9px] uppercase tracking-[0.3em] text-slate-500 font-black">Cinéma & Droits Humains</span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10 ml-auto">
          <div className="flex items-center gap-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={cn(
                "relative px-4 py-2 text-[11px] uppercase tracking-[0.25em] font-black transition-all group/nav",
                location === link.href ? "text-secondary" : "text-slate-700 hover:text-secondary"
              )}>
                <span className="relative z-10">{link.label}</span>
                {/* Cinema strip indicator */}
                <span className={cn(
                  "absolute inset-x-2 -bottom-1 h-0.5 bg-secondary transition-all duration-300",
                  location === link.href ? "w-[calc(100%-16px)]" : "w-0 group-hover/nav:w-[calc(100%-16px)]"
                )} />
                {/* Decorative film holes on hover */}
                <div className="absolute inset-0 opacity-0 group-hover/nav:opacity-10 transition-opacity flex flex-col justify-between py-1 px-0.5 pointer-events-none">
                  <div className="flex justify-between w-full">
                    <div className="w-1 h-1 bg-current rounded-full" />
                    <div className="w-1 h-1 bg-current rounded-full" />
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="w-1 h-1 bg-current rounded-full" />
                    <div className="w-1 h-1 bg-current rounded-full" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-3 pl-8 border-l border-slate-200">
            {socialLinks.map((social) => (
              <a 
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-secondary transition-colors p-1"
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
