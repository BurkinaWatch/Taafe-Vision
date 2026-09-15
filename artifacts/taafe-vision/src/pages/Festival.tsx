import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight, CircleAlert, Clapperboard, Facebook, MapPin, MessageCircle, Phone, RefreshCw, Sparkles, X } from "lucide-react";
import { Link } from "wouter";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useFestival } from "@/hooks/use-festival";
import type { FestivalMedia } from "@/lib/api";

const FESTIVAL_SLUG = "16-films-une-cause";

function LoadingFestival() {
  return (
    <div className="min-h-screen bg-[#f6efe1]">
      <Navbar />
      <main className="container-wide pt-44 pb-24" aria-busy="true" aria-live="polite">
        <div className="grid min-h-[60vh] items-end gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <div className="space-y-5">
            <div className="h-5 w-36 animate-pulse bg-black/10" />
            <div className="h-20 w-full max-w-2xl animate-pulse bg-black/10 md:h-32" />
            <div className="h-5 w-4/5 max-w-lg animate-pulse bg-black/10" />
            <div className="h-12 w-44 animate-pulse bg-black/10" />
          </div>
          <div className="aspect-[4/5] animate-pulse bg-black/10 lg:aspect-[5/6]" />
        </div>
        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((item) => <div key={item} className="h-28 animate-pulse bg-black/10" />)}
        </div>
      </main>
    </div>
  );
}

function FestivalError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="min-h-screen bg-[#f6efe1]">
      <Navbar />
      <main className="container-wide flex min-h-[75vh] items-center justify-center pt-36 pb-20">
        <section className="max-w-lg border-2 border-[#191613] bg-[#ffb21c] p-8 text-center shadow-[10px_10px_0_#191613] md:p-12" data-testid="status-festival-error">
          <CircleAlert className="mx-auto mb-5 h-10 w-10" aria-hidden="true" />
          <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.22em]">Signal perdu</p>
          <h1 className="mb-4 text-3xl font-display font-extrabold text-[#191613]">Le festival ne répond pas.</h1>
          <p className="mb-7 text-sm leading-6 text-[#191613]/75">Réessayez dans un instant pour retrouver la programmation et les images de la campagne.</p>
          <button
            type="button"
            onClick={onRetry}
            data-testid="button-retry-festival"
            className="inline-flex items-center gap-2 border-2 border-[#191613] bg-[#191613] px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#ffb21c] transition-transform hover:-translate-y-1"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Recharger
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function GalleryCard({
  media,
  index,
  onOpen,
}: {
  media: FestivalMedia;
  index: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-testid={`button-gallery-${media.id}`}
      className={`group relative block w-full overflow-hidden border-2 border-[#191613] bg-[#191613] text-left ${index === 0 ? "md:row-span-2 md:min-h-[540px]" : "min-h-[250px]"}`}
      aria-label={`Voir l'image ${index + 1}${media.caption ? ` : ${media.caption}` : ""}`}
    >
      <img
        src={media.imageUrl}
        alt={media.altText}
        loading={index > 1 ? "lazy" : "eager"}
        decoding="async"
        className="h-full min-h-[250px] w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100 md:min-h-0"
      />
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#191613]/90 via-[#191613]/20 to-transparent p-5 pt-16 text-sm font-medium text-[#fff7e8]">
        <span className="block max-w-[28rem]">{media.caption}</span>
      </span>
      <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-[#fff7e8]/50 bg-[#191613]/70 text-[#fff7e8] opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </button>
  );
}

export default function Festival() {
  const { festival, isLoading, isError, refetch } = useFestival(FESTIVAL_SLUG);
  const [activeMedia, setActiveMedia] = useState<number | null>(null);

  const sortedMedia = useMemo(
    () => [...(festival?.media ?? [])].sort((a, b) => a.displayOrder - b.displayOrder),
    [festival?.media],
  );
  const activeIndex = activeMedia === null ? -1 : sortedMedia.findIndex((media) => media.id === activeMedia);
  const activeImage = activeIndex >= 0 ? sortedMedia[activeIndex] : null;
  const heroImage = festival?.featuredImageUrl || sortedMedia[0]?.imageUrl;

  if (isLoading) return <LoadingFestival />;
  if (isError || !festival) return <FestivalError onRetry={() => void refetch()} />;

  const nextImage = () => {
    if (!sortedMedia.length) return;
    const nextIndex = activeIndex < sortedMedia.length - 1 ? activeIndex + 1 : 0;
    setActiveMedia(sortedMedia[nextIndex].id);
  };
  const previousImage = () => {
    if (!sortedMedia.length) return;
    const previousIndex = activeIndex > 0 ? activeIndex - 1 : sortedMedia.length - 1;
    setActiveMedia(sortedMedia[previousIndex].id);
  };

  return (
    <div className="festival-grain min-h-screen overflow-hidden bg-[#f6efe1] text-[#191613]">
      <Navbar />

      <main>
        <section className="relative overflow-hidden bg-[#f6efe1] pb-16 pt-36 md:pb-24 md:pt-48" data-testid="section-festival-hero">
          <div className="pointer-events-none absolute -right-24 top-32 h-56 w-56 rounded-full border-[24px] border-[#ffb21c]/70 md:h-80 md:w-80" aria-hidden="true" />
          <div className="container-wide relative">
            <div className="mb-7 flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#ee5b25] md:mb-10">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ee5b25]" />
              <span data-testid="text-festival-category">{festival.category}</span>
              <span className="text-[#191613]/40">/</span>
              <span>Taafé Vision présente</span>
            </div>

            <div className="grid items-end gap-10 lg:grid-cols-[1fr_.82fr] lg:gap-16">
              <div className="relative z-10">
                <h1 className="max-w-4xl text-[clamp(4rem,12vw,10.5rem)] font-display font-extrabold leading-[0.82] tracking-[-0.07em] text-[#191613]" data-testid="text-festival-name">
                  {festival.name}
                </h1>
                <div className="mt-9 flex max-w-2xl items-start gap-4 border-l-4 border-[#ee5b25] pl-5 md:mt-12 md:pl-7">
                  <p className="text-lg font-medium leading-snug text-[#191613]/75 md:text-2xl" data-testid="text-festival-tagline">
                    {festival.tagline}
                  </p>
                </div>
                <div className="mt-10 flex flex-wrap gap-3">
                  <a
                    href="#la-cause"
                    data-testid="link-discover-cause"
                    className="inline-flex items-center gap-3 bg-[#191613] px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#ffcf45] transition-transform hover:-translate-y-1"
                  >
                    Découvrir la cause
                    <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href={festival.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-festival-facebook"
                    className="inline-flex items-center gap-2 border-2 border-[#191613] px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#191613] transition-colors hover:bg-[#4267b2] hover:text-[#fff7e8]"
                  >
                    <Facebook className="h-4 w-4" aria-hidden="true" />
                    Facebook
                  </a>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-[34rem] lg:mx-0 lg:justify-self-end">
                <div className="absolute -left-4 -top-4 z-20 flex h-24 w-24 -rotate-12 items-center justify-center rounded-full bg-[#ffcf45] p-4 text-center font-mono text-[10px] font-bold uppercase leading-tight tracking-[0.08em] text-[#191613] md:-left-8 md:-top-7 md:h-32 md:w-32">
                  <span>{festival.edition}</span>
                </div>
                <div className="relative aspect-[4/5] overflow-hidden border-2 border-[#191613] bg-[#ee5b25] shadow-[14px_14px_0_#191613] md:aspect-[5/6]">
                  {heroImage ? (
                    <img src={heroImage} alt={festival.name} className="h-full w-full object-cover" data-testid="img-festival-featured" />
                  ) : (
                    <div className="flex h-full items-center justify-center p-8 text-center font-display text-4xl font-extrabold text-[#ffcf45]">Taafé Vision</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#191613]/70 via-transparent to-transparent" />
                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-5 text-[#fff7e8]">
                    <span className="max-w-[14rem] text-sm font-medium leading-snug">{festival.dateRange}</span>
                    <Clapperboard className="h-10 w-10 shrink-0 text-[#ffcf45]" aria-hidden="true" />
                  </div>
                </div>
                <p className="mt-5 text-right font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#191613]/45">Ouagadougou · Burkina Faso</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y-2 border-[#191613] bg-[#ffb21c]" aria-label="Informations pratiques">
          <div className="container-wide grid md:grid-cols-3">
            <div className="flex items-center gap-4 border-[#191613]/20 py-6 md:border-r md:pr-8" data-testid="text-festival-date">
              <CalendarDays className="h-7 w-7 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#191613]/60">Quand</p>
                <p className="mt-1 font-display text-xl font-bold">{festival.dateRange}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-[#191613]/20 py-6 md:border-r md:px-8" data-testid="text-festival-location">
              <MapPin className="h-7 w-7 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#191613]/60">Où</p>
                <p className="mt-1 font-display text-xl font-bold">{festival.location}, {festival.city}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 py-6 md:pl-8" data-testid="text-festival-edition">
              <Sparkles className="h-7 w-7 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#191613]/60">Édition</p>
                <p className="mt-1 font-display text-xl font-bold">{festival.edition}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="la-cause" className="bg-[#191613] py-20 text-[#fff7e8] md:py-32" data-testid="section-festival-cause">
          <div className="container-wide grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#ffcf45]">01 — La cause</p>
              <h2 className="max-w-md text-5xl font-display font-extrabold leading-[0.9] tracking-[-0.05em] text-[#fff7e8] md:text-7xl">
                Le cinéma comme prise de parole.
              </h2>
            </div>
            <div className="max-w-2xl">
              <p className="text-2xl font-medium leading-tight text-[#ffcf45] md:text-4xl" data-testid="text-festival-description-lead">
                {festival.tagline}
              </p>
              <div className="my-8 h-px bg-[#fff7e8]/20" />
              <p className="text-base leading-8 text-[#fff7e8]/70 md:text-lg" data-testid="text-festival-description">
                {festival.description}
              </p>
              <div className="mt-10 grid gap-5 border-t border-[#fff7e8]/20 pt-6 sm:grid-cols-2">
                <div>
                  <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#fff7e8]/45">Format</p>
                  <p className="font-display text-xl font-bold text-[#fff7e8]">{festival.category}</p>
                </div>
                <div>
                  <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#fff7e8]/45">Territoire</p>
                  <p className="font-display text-xl font-bold text-[#fff7e8]">{festival.location}, {festival.city}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f6efe1] py-20 md:py-28" data-testid="section-festival-gallery">
          <div className="container-wide">
            <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
              <div>
                <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#ee5b25]">02 — Images de campagne</p>
                <h2 className="max-w-xl text-5xl font-display font-extrabold leading-[0.9] tracking-[-0.05em] md:text-7xl">Des images qui restent.</h2>
              </div>
              <p className="max-w-xs text-sm leading-6 text-[#191613]/60">Une archive vivante du festival, de ses regards et des conversations qu’il ouvre.</p>
            </div>
            {sortedMedia.length ? (
              <div className="grid auto-rows-[250px] gap-4 md:grid-cols-2 md:auto-rows-[270px]">
                {sortedMedia.map((media, index) => (
                  <GalleryCard key={media.id} media={media} index={index} onOpen={() => setActiveMedia(media.id)} />
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-[#191613]/30 px-6 py-20 text-center" data-testid="empty-festival-gallery">
                <Clapperboard className="mx-auto mb-4 h-8 w-8 text-[#ee5b25]" aria-hidden="true" />
                <p className="font-display text-2xl font-bold">Les images arrivent bientôt.</p>
              </div>
            )}
          </div>
        </section>

        <section className="bg-[#ee5b25] py-20 md:py-28" data-testid="section-festival-contact">
          <div className="container-wide grid items-end gap-12 lg:grid-cols-[1fr_.8fr] lg:gap-24">
            <div>
              <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#191613]/65">03 — Venir, partager, agir</p>
              <h2 className="max-w-3xl text-5xl font-display font-extrabold leading-[0.88] tracking-[-0.06em] text-[#191613] md:text-8xl">
                Prenez part<br />à la séance.
              </h2>
              <p className="mt-8 max-w-xl text-lg leading-7 text-[#191613]/75">{festival.description}</p>
            </div>
            <div className="border-2 border-[#191613] bg-[#ffcf45] p-6 shadow-[10px_10px_0_#191613] md:p-8">
              <p className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">Infos & contact</p>
              <div className="space-y-4">
                <a href={`tel:${festival.phone.replace(/\s/g, "")}`} data-testid="link-festival-phone" className="flex items-center gap-4 border-b border-[#191613]/20 pb-4 font-display text-2xl font-bold transition-transform hover:translate-x-1">
                  <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
                  {festival.phone}
                </a>
                <a href={`https://m.me/${encodeURIComponent(festival.messenger)}`} target="_blank" rel="noopener noreferrer" data-testid="link-festival-messenger" className="flex items-center gap-4 border-b border-[#191613]/20 pb-4 font-display text-lg font-bold transition-transform hover:translate-x-1">
                  <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                  {festival.messenger}
                </a>
                <a href={festival.facebookUrl} target="_blank" rel="noopener noreferrer" data-testid="link-festival-facebook-contact" className="flex items-center justify-between gap-4 pt-1 font-mono text-xs font-bold uppercase tracking-[0.12em] transition-transform hover:translate-x-1">
                  <span className="flex items-center gap-3"><Facebook className="h-5 w-5" aria-hidden="true" /> Suivre sur Facebook</span>
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t-2 border-[#191613] bg-[#ffcf45] py-8" data-testid="section-festival-signoff">
          <div className="container-wide flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <p className="font-display text-2xl font-bold leading-tight md:text-3xl">Les histoires changent quand on les regarde ensemble.</p>
            <Link href="/films" data-testid="link-all-films" className="inline-flex items-center gap-2 border-2 border-[#191613] px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] transition-colors hover:bg-[#191613] hover:text-[#ffcf45]">
              Explorer les films
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {activeImage && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#191613]/95 p-4 md:p-10" role="dialog" aria-modal="true" aria-label="Visionneuse de la galerie" onClick={() => setActiveMedia(null)}>
          <div className="relative flex h-full w-full max-w-6xl items-center justify-center" onClick={(event) => event.stopPropagation()}>
            <img src={activeImage.imageUrl} alt={activeImage.altText} className="max-h-[82vh] max-w-full object-contain" data-testid={`img-gallery-lightbox-${activeImage.id}`} />
            <p className="absolute bottom-0 left-0 right-0 bg-[#191613]/80 p-4 text-center text-sm text-[#fff7e8]">{activeImage.caption}</p>
            <button type="button" onClick={() => setActiveMedia(null)} data-testid="button-close-gallery" aria-label="Fermer la galerie" className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center border border-[#fff7e8]/40 text-[#fff7e8] transition-colors hover:bg-[#fff7e8] hover:text-[#191613]">
              <X className="h-5 w-5" />
            </button>
            {sortedMedia.length > 1 && (
              <>
                <button type="button" onClick={previousImage} data-testid="button-previous-gallery" aria-label="Image précédente" className="absolute left-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-[#fff7e8]/40 text-[#fff7e8] transition-colors hover:bg-[#ffcf45] hover:text-[#191613]">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button type="button" onClick={nextImage} data-testid="button-next-gallery" aria-label="Image suivante" className="absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-[#fff7e8]/40 text-[#fff7e8] transition-colors hover:bg-[#ffcf45] hover:text-[#191613]">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}