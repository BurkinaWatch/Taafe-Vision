import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import { useContact } from "@/hooks/use-contact";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  const { mutate, isPending } = useContact();
  
  const form = useForm({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-slate-950 text-white pt-32 pb-20">
          <div className="container-wide">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">CONTACTEZ-NOUS</h1>
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
              Que vous ayez besoin de soutien, que vous souhaitiez vous impliquer ou que vous ayez des questions sur notre travail, nous sommes là pour vous aider. Contactez-nous dès aujourd'hui.
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="container-wide -mt-10 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Nous Visiter</h3>
              <p className="text-muted-foreground">Ouagadougou, Burkina Faso</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Nous Appeler</h3>
              <p className="text-muted-foreground">+226 00 00 00 00</p>
              <p className="text-sm text-primary font-medium mt-1">Ligne d'urgence 24/7</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Nous Écrire</h3>
              <p className="text-muted-foreground">contact@taafevision.org</p>
              <p className="text-muted-foreground">support@taafevision.org</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Heures d'ouverture</h3>
              <p className="text-muted-foreground">Lun-Ven: 9h - 17h</p>
              <p className="text-muted-foreground">Urgence: 24/7</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="container-wide pb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-display font-bold text-slate-900">Restons en contact</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Vous avez des questions ou vous voulez vous impliquer ? Nous serions ravis de vous entendre. Remplissez le formulaire et notre équipe vous répondra dans les plus brefs délais.
              </p>
              <div className="pt-8 space-y-4">
                <h4 className="font-bold text-lg text-slate-900">Informations de contact</h4>
                <div className="space-y-2 text-slate-600">
                  <p className="flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Ouagadougou, Burkina Faso</p>
                  <p className="flex items-center gap-2"><Mail className="w-5 h-5 text-primary" /> contact@taafevision.org</p>
                  <p className="flex items-center gap-2"><Phone className="w-5 h-5 text-primary" /> +226 00 00 00 00</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 md:p-12 rounded-2xl border border-slate-200">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900">Prénom & Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre nom complet" {...field} className="h-12 bg-white border-slate-200 focus:border-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900">Email</FormLabel>
                          <FormControl>
                            <Input placeholder="votre@email.com" type="email" {...field} className="h-12 bg-white border-slate-200 focus:border-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900">Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Comment pouvons-nous vous aider ?" {...field} className="min-h-[150px] bg-white border-slate-200 focus:border-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full h-12 text-lg bg-slate-900 hover:bg-slate-800 text-white font-bold tracking-wide rounded-lg transition-all"
                  >
                    {isPending ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
