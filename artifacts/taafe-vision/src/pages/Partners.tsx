import { ArrowUpRight, Handshake, UsersRound } from "lucide-react";
import { Link } from "wouter";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { usePartners } from "@/hooks/use-partners";

function PartnerInitials({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 font-display text-xl font-bold text-primary" aria-hidden="true">
      {initials || "TV"}
    </div>
  );
}

export default function Partners() {
  const { partners, isLoading, isError } = usePartners();

  return (
    <div className="page-shell">
      <Navbar />
      <main className="flex-1">
        <section className="page-hero pt-32 pb-20 md:pt-40 md:pb-24">
          <div className="container-wide grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="page-eyebrow mb-5 text-accent">Collaborations engagées</p>
              <h1 className="text-5xl font-display font-bold leading-[0.95] md:text-7xl">
                Des alliances pour faire avancer les regards.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-background/70 md:text-xl">
                Taafé Vision travaille avec des organisations qui partagent une même conviction : les images peuvent ouvrir des espaces plus justes pour les femmes.
              </p>
            </div>
            <div className="border-l border-background/20 pl-6">
              <Handshake className="mb-5 h-8 w-8 text-accent" aria-hidden="true" />
              <p className="font-display text-2xl font-semibold leading-snug text-accent">
                Produire, transmettre et diffuser ensemble.
              </p>
            </div>
          </div>
        </section>

        <section className="container-wide py-16 md:py-24" aria-labelledby="partners-title">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="page-eyebrow mb-3">Notre écosystème</p>
              <h2 id="partners-title" className="font-display text-4xl font-bold text-foreground md:text-5xl">
                Nos partenaires
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Des soutiens institutionnels, culturels et associatifs qui rendent nos actions possibles.
            </p>
          </div>

          {isLoading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-live="polite">
              {[0, 1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="page-card h-48 animate-pulse bg-muted/50" />
              ))}
            </div>
          ) : isError ? (
            <div className="surface-subtle p-8 text-center" role="status">
              <p className="font-display text-2xl font-bold text-foreground">Les partenaires ne peuvent pas être chargés pour le moment.</p>
              <p className="mt-2 text-muted-foreground">Réessayez dans quelques instants.</p>
            </div>
          ) : partners && partners.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {partners.map((partner) => (
                <article key={partner.id} className="page-card interactive-lift flex min-h-48 flex-col justify-between p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-h-16 min-w-16 items-center justify-center overflow-hidden rounded-2xl border border-border bg-card p-2">
                      {partner.logoUrl ? (
                        <img
                          src={partner.logoUrl}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="max-h-12 max-w-28 object-contain"
                        />
                      ) : (
                        <PartnerInitials name={partner.name} />
                      )}
                    </div>
                    <UsersRound className="h-5 w-5 text-secondary-foreground" aria-hidden="true" />
                  </div>
                  <div className="mt-8">
                    <h3 className="font-display text-xl font-bold text-foreground">{partner.name}</h3>
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary/75"
                      >
                        Visiter le site
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="surface-subtle p-10 text-center">
              <p className="font-display text-2xl font-bold text-foreground">Partenaires en cours d’ajout.</p>
              <p className="mt-2 text-muted-foreground">Cette liste sera enrichie au fil des collaborations.</p>
            </div>
          )}
        </section>

        <section className="container-wide pb-20 md:pb-28">
          <div className="page-card grid gap-8 overflow-hidden bg-secondary/25 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
            <div className="max-w-2xl">
              <p className="page-eyebrow mb-3">Construire avec nous</p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Votre organisation partage notre vision ?</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Parlons d’un projet de formation, de production ou de diffusion qui peut renforcer la voix des femmes.
              </p>
            </div>
            <Link href="/contact?action=engagement" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 hover:shadow-lg">
              Devenir partenaire
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
