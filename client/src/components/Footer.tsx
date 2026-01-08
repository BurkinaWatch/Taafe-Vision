import { Link } from "wouter";
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-24 mt-0">
      <div className="container-wide grid grid-cols-1 md:grid-cols-12 gap-16">
        
        {/* Brand */}
        <div className="md:col-span-5 space-y-8">
          <div className="flex flex-col">
            <h3 className="text-3xl font-display font-bold text-white tracking-tighter">Taafé Vision</h3>
            <span className="text-secondary text-xs uppercase tracking-[0.3em] font-bold mt-2">Cinéma & Droits des Femmes</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-lg max-w-md">
            Une organisation féministe utilisant le cinéma comme outil de transformation sociale et de plaidoyer pour l'égalité des genres depuis 2017.
          </p>
          <div className="flex gap-6 pt-4">
            <a href="#" className="text-white hover:text-secondary transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-white hover:text-secondary transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-white hover:text-secondary transition-colors">
              <Youtube className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Links Group */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-12">
          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-slate-500">Navigation</h4>
            <nav className="flex flex-col space-y-4">
              <Link href="/about" className="text-slate-300 hover:text-white transition-colors">Notre Histoire</Link>
              <Link href="/films" className="text-slate-300 hover:text-white transition-colors">Productions</Link>
              <Link href="/projects" className="text-slate-300 hover:text-white transition-colors">Programmes</Link>
              <Link href="/news" className="text-slate-300 hover:text-white transition-colors">Actualités</Link>
              <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-slate-500">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-slate-300">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-1" />
                <span>Ouagadougou, Burkina Faso</span>
              </div>
              <div className="flex items-start gap-3 text-slate-300">
                <Mail className="w-5 h-5 text-secondary shrink-0 mt-1" />
                <span>infotaafe@gmail.com</span>
              </div>
              <div className="flex items-start gap-3 text-slate-300">
                <Phone className="w-5 h-5 text-secondary shrink-0 mt-1" />
                <span>+226 00 00 00 00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-wide mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500 uppercase tracking-widest">
        <span>© {new Date().getFullYear()} Taafé Vision. Tous droits réservés.</span>
        <Link href="/admin/login" className="hover:text-white transition-colors italic">Espace Administration</Link>
      </div>
    </footer>
  );
}
