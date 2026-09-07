import { Link } from "wouter";
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="container-wide py-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

        {/* Brand */}
        <div className="flex flex-col gap-3">
          <div className="border-l-2 border-secondary pl-4">
            <p className="text-xl font-display font-bold text-white leading-tight">Taafé Vision</p>
            <p className="text-secondary text-[10px] uppercase tracking-[0.25em] font-bold mt-0.5">Artivisme pour un monde plus juste</p>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed">
            Organisation féministe utilisant le cinéma pour défendre les droits des femmes au Burkina Faso, depuis 2017.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-slate-500">Navigation</p>
          <nav className="grid grid-cols-2 gap-x-4 gap-y-2">
            {[
              { href: "/about", label: "À propos" },
              { href: "/films", label: "Films" },
              { href: "/projects", label: "Programmes" },
              { href: "/news", label: "Blog" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
              >
                <span className="w-1 h-1 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact & Socials */}
        <div className="flex flex-col gap-3">
          <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-slate-500">Contact</p>
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
              Ouagadougou, Burkina Faso
            </span>
            <a
              href="tel:+22678097788"
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-secondary shrink-0" />
              +226 78 09 77 88
            </a>
            <div className="flex flex-col gap-1">
              <a
                href="mailto:contact@taafevision.com"
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-secondary shrink-0" />
                contact@taafevision.com
              </a>
              <a
                href="mailto:info@taafevision.com"
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-secondary shrink-0" />
                info@taafevision.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-1">
            {[
              { href: "https://facebook.com/taafevision", Icon: Facebook, label: "Facebook" },
              { href: "https://instagram.com/taafevision", Icon: Instagram, label: "Instagram" },
              { href: "https://youtube.com/@taafevision", Icon: Youtube, label: "YouTube" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:border-secondary hover:text-secondary transition-all duration-200"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-wide py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] text-slate-600 uppercase tracking-widest">
          <span>© {new Date().getFullYear()} Taafé Vision. Tous droits réservés.</span>
          <Link href="/admin/login" className="hover:text-slate-400 transition-colors">
            Espace Administration
          </Link>
        </div>
      </div>
    </footer>
  );
}
