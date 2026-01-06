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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="container-wide py-5 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold font-display text-slate-900 flex items-center gap-3 group">
          <div className="relative">
            <img src="/images/logo.jpg" alt="Taafé Vision Logo" className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 group-hover:border-secondary transition-colors" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="tracking-tighter">Taafé Vision</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-body mt-1">Cinéma & Droits</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6 border-r border-slate-200 pr-8">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={cn(
                "text-[10px] uppercase tracking-[0.2em] font-bold transition-all hover:text-secondary",
                location === link.href ? "text-secondary" : "text-slate-600"
              )}>
                {link.label}
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
