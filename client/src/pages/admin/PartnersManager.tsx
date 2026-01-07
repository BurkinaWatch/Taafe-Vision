import { useQuery, useMutation } from "@tanstack/react-query";
import { Partner, insertPartnerSchema } from "@shared/schema";
import { Dashboard } from "./Dashboard";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export default function PartnersManager() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { data: partners, isLoading } = useQuery<Partner[]>({ 
    queryKey: ["/api/partners"] 
  });

  const form = useForm({
    resolver: zodResolver(insertPartnerSchema),
    defaultValues: {
      name: "",
      logoUrl: "",
      website: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/partners", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/partners"] });
      setOpen(false);
      form.reset();
      toast({ title: "Partenaire ajouté" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/partners/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/partners"] });
      toast({ title: "Partenaire supprimé" });
    },
  });

  return (
    <Dashboard>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-primary">Gestion des Partenaires</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> Nouveau Partenaire
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un Partenaire</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => createMutation.mutate(data))} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="logoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL du Logo</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site Web (Optionnel)</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                  Enregistrer
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          partners?.map((partner) => (
            <div key={partner.id} className="bg-white p-6 rounded-xl shadow-sm border border-border flex flex-col items-center">
              <img src={partner.logoUrl} alt={partner.name} className="h-16 w-auto object-contain mb-4" />
              <h3 className="font-bold text-center mb-4">{partner.name}</h3>
              <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(partner.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))
        )}
      </div>
    </Dashboard>
  );
}
