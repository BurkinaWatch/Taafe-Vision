import { Link } from "wouter";
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16 mt-24">
      <div className="container-wide grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="text-2xl font-display text-white">Taafé Vision</h3>
          <p className="text-primary-foreground/80 leading-relaxed">
            Promouvoir les femmes dans le cinéma et les arts audiovisuels. Créer des opportunités, raconter des histoires, et donner du pouvoir aux voix depuis 2017.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-secondary">Navigation</h4>
          <nav className="flex flex-col space-y-2">
            <Link href="/about" className="hover:text-secondary transition-colors">À propos</Link>
            <Link href="/films" className="hover:text-secondary transition-colors">Nos Films</Link>
            <Link href="/projects" className="hover:text-secondary transition-colors">Projets</Link>
            <Link href="/contact" className="hover:text-secondary transition-colors">Contact</Link>
            <Link href="/admin/login" className="text-white/40 hover:text-white text-sm pt-4">Connexion Admin</Link>
          </nav>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-secondary">Contact</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-primary-foreground/80">
              <MapPin className="w-5 h-5 text-secondary" />
              <span>Ouagadougou, Burkina Faso</span>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground/80">
              <Mail className="w-5 h-5 text-secondary" />
              <span>contact@taafevision.org</span>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground/80">
              <Phone className="w-5 h-5 text-secondary" />
              <span>+226 00 00 00 00</span>
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-secondary">Nous Suivre</h4>
          <div className="flex gap-4">
            <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-secondary hover:text-white transition-all">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-secondary hover:text-white transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-secondary hover:text-white transition-all">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="container-wide mt-16 pt-8 border-t border-white/10 text-center text-sm text-white/40">
        © {new Date().getFullYear()} Taafé Vision. Tous droits réservés.
      </div>
    </footer>
  );
}
