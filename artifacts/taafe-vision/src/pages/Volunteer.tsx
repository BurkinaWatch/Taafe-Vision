import { useState } from "react";
import { Link } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CheckCircle2, Clapperboard, HandHeart, MapPin, Send, Sparkles, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useContact } from "@/hooks/use-contact";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const volunteerSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre prénom et votre nom."),
  email: z.string().trim().email("Saisissez une adresse e-mail valide."),
  phone: z.string().trim().min(8, "Indiquez un numéro joignable."),
  city: z.string().trim().min(2, "Indiquez votre ville de résidence."),
  availability: z.string().trim().min(2, "Précisez vos disponibilités."),
  skills: z.string().trim().min(2, "Parlez-nous de vos compétences."),
  motivation: z.string().trim().min(20, "Votre motivation doit contenir au moins 20 caractères."),
  consent: z.boolean().refine((value) => value, {
    message: "Votre accord est nécessaire pour être recontacté(e).",
  }),
});

type VolunteerValues = z.infer<typeof volunteerSchema>;

const defaultValues: VolunteerValues = {
  name: "",
  email: "",
  phone: "",
  city: "",
  availability: "",
  skills: "",
  motivation: "",
  consent: false,
};

export default function Volunteer() {
  const { mutate, isPending } = useContact();
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<VolunteerValues>({
    resolver: zodResolver(volunteerSchema),
    defaultValues,
  });

  const onSubmit = (values: VolunteerValues) => {
    const message = [
      "Candidature bénévole — Taafé Vision",
      "",
      `Téléphone : ${values.phone}`,
      `Ville de résidence : ${values.city}`,
      `Disponibilités : ${values.availability}`,
      `Compétences et savoir-faire : ${values.skills}`,
      "",
      "Motivation :",
      values.motivation,
    ].join("\n");

    mutate(
      { name: values.name, email: values.email, message },
      {
        onSuccess: () => {
          form.reset(defaultValues);
          setSubmitted(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-[#fdf8e6] text-slate-950">
      <Navbar />
      <main className="pt-[72px] lg:pt-[132px]">
        <section className="relative overflow-hidden bg-[#561a44] text-white">
          <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#f146ad]/25 blur-3xl" />
          <div className="absolute -bottom-36 left-1/3 h-96 w-96 rounded-full bg-[#39cd15]/15 blur-3xl" />
          <div className="container-wide relative grid gap-12 py-16 md:py-24 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div className="max-w-3xl">
              <Link
                href="/"
                data-testid="link-volunteer-home"
                className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-[#f8d34f]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Retour à l’accueil
              </Link>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#f8d34f]">
                <HandHeart className="h-4 w-4" aria-hidden="true" />
                Rejoindre le mouvement
              </div>
              <h1 className="max-w-2xl font-display text-5xl font-bold leading-[0.96] md:text-7xl">
                Votre temps peut changer le récit.
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">
                Taafé Vision rassemble celles et ceux qui croient au pouvoir des images, de la transmission et de l’action collective pour défendre les droits des femmes.
              </p>
            </div>

            <div className="border-l border-white/20 pl-6 lg:mb-2">
              <p className="font-display text-2xl font-semibold leading-snug text-[#f8d34f]">
                « Nous créons ensemble des espaces où les voix des femmes comptent. »
              </p>
              <p className="mt-5 text-sm uppercase tracking-[0.18em] text-white/50">
                Ouagadougou · Burkina Faso
              </p>
            </div>
          </div>
        </section>

        <section className="container-wide grid gap-12 py-14 md:py-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="space-y-10">
            {submitted ? (
              <div
                role="status"
                data-testid="status-volunteer-success"
                className="rounded-2xl border border-[#39cd15]/30 bg-white p-7 shadow-[0_18px_55px_rgba(86,26,68,0.08)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#39cd15]/15 text-[#288f10]">
                  <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                </div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#288f10]">Candidature reçue</p>
                <h2 className="font-display text-3xl font-bold text-[#561a44]">Merci de faire équipe avec nous.</h2>
                <p className="mt-4 leading-relaxed text-slate-600">
                  Votre message est bien arrivé. L’équipe Taafé Vision reviendra vers vous prochainement pour échanger sur la meilleure manière de contribuer.
                </p>
                <Link
                  href="/"
                  data-testid="link-success-home"
                  className="mt-7 inline-flex items-center gap-2 font-bold text-[#561a44] underline decoration-[#f146ad] decoration-2 underline-offset-4 hover:text-[#f146ad]"
                >
                  Revenir à l’accueil
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            ) : (
              <>
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#f146ad]">Pourquoi nous rejoindre</p>
                  <h2 className="font-display text-4xl font-bold leading-tight text-[#561a44] md:text-5xl">
                    Une énergie concrète, au service des histoires qui comptent.
                  </h2>
                  <p className="mt-5 leading-relaxed text-slate-600">
                    Il n’est pas nécessaire d’être cinéaste pour participer. Chaque compétence, chaque disponibilité et chaque regard peuvent nourrir nos films, nos formations et nos rencontres.
                  </p>
                </div>
                <div className="space-y-5">
                  {[
                    { icon: Clapperboard, title: "Faire vivre les images", text: "Appui aux tournages, projections, débats et actions de sensibilisation." },
                    { icon: Users, title: "Faire grandir la communauté", text: "Accueil, mobilisation et lien avec les associations et les publics." },
                    { icon: Sparkles, title: "Partager votre savoir-faire", text: "Communication, design, traduction, événementiel, administration et bien plus." },
                  ].map(({ icon: Icon, title, text }) => (
                    <div key={title} className="flex gap-4 border-t border-[#561a44]/10 pt-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f146ad]/10 text-[#f146ad]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-[#561a44]">{title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-3 border-l-2 border-[#39cd15] pl-4 text-sm leading-relaxed text-slate-600">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#288f10]" aria-hidden="true" />
                  <span>Les missions sont principalement basées à Ouagadougou, avec des possibilités ponctuelles à distance ou dans d’autres localités.</span>
                </div>
              </>
            )}
          </div>

          {!submitted && (
            <div className="rounded-2xl border border-[#561a44]/10 bg-white p-6 shadow-[0_22px_70px_rgba(86,26,68,0.1)] md:p-10">
              <div className="mb-8 border-b border-slate-200 pb-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f146ad]">Parlons de vous</p>
                <h2 className="mt-2 font-display text-3xl font-bold text-[#561a44]">Devenir bénévole</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">Les champs marqués d’un astérisque sont obligatoires.</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-800">Prénom et nom *</FormLabel>
                        <FormControl><Input data-testid="input-volunteer-name" placeholder="Awa Traoré" autoComplete="name" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-800">Adresse e-mail *</FormLabel>
                        <FormControl><Input data-testid="input-volunteer-email" type="email" placeholder="awa@exemple.com" autoComplete="email" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-800">Téléphone *</FormLabel>
                        <FormControl><Input data-testid="input-volunteer-phone" type="tel" placeholder="+226 70 00 00 00" autoComplete="tel" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-800">Ville *</FormLabel>
                        <FormControl><Input data-testid="input-volunteer-city" placeholder="Ouagadougou" autoComplete="address-level2" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="availability" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-800">Vos disponibilités *</FormLabel>
                      <FormControl><Input data-testid="input-volunteer-availability" placeholder="Ex. quelques heures le week-end, ou deux jours par mois" {...field} /></FormControl>
                      <FormDescription>Indiquez le rythme qui vous conviendrait et, si utile, une période de disponibilité.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="skills" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-800">Compétences et savoir-faire *</FormLabel>
                      <FormControl><Textarea data-testid="input-volunteer-skills" placeholder="Communication, prise de parole, montage, accueil, traduction, organisation…" className="min-h-[92px] resize-y" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="motivation" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-800">Pourquoi souhaitez-vous nous rejoindre ? *</FormLabel>
                      <FormControl><Textarea data-testid="input-volunteer-motivation" placeholder="Dites-nous ce qui vous anime et ce que vous aimeriez construire avec Taafé Vision." className="min-h-[140px] resize-y" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="consent" render={({ field }) => (
                    <FormItem className="rounded-lg border border-slate-200 bg-[#fdf8e6]/60 p-4">
                      <div className="flex items-start gap-3">
                        <FormControl>
                          <Checkbox
                            data-testid="checkbox-volunteer-consent"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            aria-label="J’accepte d’être recontacté(e)"
                          />
                        </FormControl>
                        <div className="space-y-1">
                          <FormLabel className="cursor-pointer text-sm font-medium leading-relaxed text-slate-700">
                            J’accepte que Taafé Vision me recontacte au sujet de ma candidature. *
                          </FormLabel>
                          <FormDescription className="text-xs leading-relaxed">
                            Vos informations seront utilisées uniquement pour donner suite à votre demande.
                          </FormDescription>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <Button
                    type="submit"
                    data-testid="button-volunteer-submit"
                    disabled={isPending}
                    className="h-14 w-full rounded-lg bg-[#561a44] text-base font-bold text-white shadow-lg shadow-[#561a44]/15 transition-all hover:-translate-y-0.5 hover:bg-[#7a2561] disabled:translate-y-0"
                  >
                    {isPending ? (
                      <span className="flex items-center justify-center gap-3">
                        <span className="h-4 w-4 animate-pulse rounded-full bg-[#f8d34f]" aria-hidden="true" />
                        Envoi de votre candidature…
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Envoyer ma candidature
                        <Send className="h-4 w-4" aria-hidden="true" />
                      </span>
                    )}
                  </Button>
                  <p className="text-center text-xs leading-relaxed text-slate-500">Nous lisons chaque candidature avec attention et vous répondrons dès que possible.</p>
                </form>
              </Form>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}