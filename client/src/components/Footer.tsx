import { Link } from "wouter";
import { Facebook, Instagram, Youtube, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-8 mt-0">
      <div className="container-wide flex flex-col md:flex-row md:items-center gap-6 md:gap-0 md:justify-between">

        {/* Brand */}
        <div className="flex flex-col">
          <span className="text-lg font-display font-bold text-white tracking-tight leading-tight">Taafé Vision</span>
          <span className="text-secondary text-[10px] uppercase tracking-[0.25em] font-bold">Cinéma & Droits des Femmes</span>
        </div>

        {/* Nav */}
        <nav className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-400">
          <Link href="/about" className="hover:text-white transition-colors">À propos</Link>
          <Link href="/films" className="hover:text-white transition-colors">Films</Link>
          <Link href="/projects" className="hover:text-white transition-colors">Programmes</Link>
          <Link href="/news" className="hover:text-white transition-colors">Blog</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </nav>

        {/* Contact + Socials */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-secondary" />Ouagadougou, BF</span>
            <a href="mailto:infotaafe@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-secondary" />infotaafe@gmail.com
            </a>
          </div>
          <div className="flex gap-3">
            <a href="https://facebook.com/taafevision" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-secondary transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="https://instagram.com/taafevision" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-secondary transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="https://youtube.com/@taafevision" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-secondary transition-colors"><Youtube className="w-4 h-4" /></a>
          </div>
        </div>
      </div>

      <div className="container-wide mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] text-slate-600 uppercase tracking-widest">
        <span>© {new Date().getFullYear()} Taafé Vision. Tous droits réservés.</span>
        <Link href="/admin/login" className="hover:text-slate-400 transition-colors italic">Espace Administration</Link>
      </div>
    </footer>
  );
}
