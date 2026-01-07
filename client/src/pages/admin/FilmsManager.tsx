import Dashboard from "./Dashboard";
import { useFilms } from "@/hooks/use-films";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertFilmSchema, type Film } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Pencil, Eye, EyeOff, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Extend schema for numeric coercion because forms return strings
const formSchema = insertFilmSchema.extend({
  year: z.coerce.number(),
});

export default function FilmsManager() {
  const { films, isLoading, create, remove } = useFilms();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [editingFilm, setEditingFilm] = useState<Film | null>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      director: "",
      synopsis: "",
      year: new Date().getFullYear(),
      imageUrl: "",
      videoUrl: "",
      isHidden: false,
    },
  });

  useEffect(() => {
    if (editingFilm) {
      form.reset({
        title: editingFilm.title,
        director: editingFilm.director,
        synopsis: editingFilm.synopsis,
        year: editingFilm.year,
        imageUrl: editingFilm.imageUrl,
        videoUrl: editingFilm.videoUrl || "",
        isHidden: editingFilm.isHidden,
      });
    } else {
      form.reset({
        title: "",
        director: "",
        synopsis: "",
        year: new Date().getFullYear(),
        imageUrl: "",
        videoUrl: "",
        isHidden: false,
      });
    }
  }, [editingFilm, form]);

  const onSubmit = (data: any) => {
    if (editingFilm) {
      updateMutation.mutate(data);
    } else {
      create.mutate(data, {
        onSuccess: () => {
          setIsOpen(false);
          form.reset();
        },
      });
    }
  };

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("PATCH", `/api/films/${editingFilm?.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/films"] });
      setIsOpen(false);
      setEditingFilm(null);
      form.reset();
      toast({ title: "Film mis à jour" });
    },
  });

  const toggleHideMutation = useMutation({
    mutationFn: async ({ id, isHidden }: { id: number, isHidden: boolean }) => {
      await apiRequest("PATCH", `/api/films/${id}`, { isHidden: !isHidden });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/films"] });
      toast({ title: "Visibilité mise à jour" });
    },
  });

  const handleShare = (film: Film) => {
    const url = `${window.location.origin}/films/${film.id}`;
    navigator.clipboard.writeText(url);
    toast({ title: "Lien copié dans le presse-papier" });
  };

  return (
    <Dashboard>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display font-bold text-primary">Gestion des Films</h1>
        
        <Dialog open={isOpen} onOpenChange={(val) => {
          setIsOpen(val);
          if (!val) setEditingFilm(null);
        }}>
          <DialogTrigger asChild>
            <Button className="bg-secondary hover:bg-secondary/90 text-white gap-2">
              <Plus className="w-4 h-4" /> Ajouter un Film
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingFilm ? "Modifier le Film" : "Ajouter un Film"}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="director"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Réalisateur</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Année</FormLabel>
                        <FormControl><Input type="number" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL de l'image de couverture</FormLabel>
                      <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="videoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL de la vidéo (Optionnel)</FormLabel>
                      <FormControl><Input placeholder="https://..." {...field} value={field.value || ""} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="synopsis"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Synopsis</FormLabel>
                      <FormControl><Textarea {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={create.isPending || updateMutation.isPending} className="w-full">
                  {editingFilm ? "Mettre à jour" : "Créer le Film"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Réalisateur</TableHead>
              <TableHead>Année</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8">Chargement...</TableCell></TableRow>
            ) : films?.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8">Aucun film trouvé.</TableCell></TableRow>
            ) : (
              films?.map((film) => (
                <TableRow key={film.id} className={film.isHidden ? "opacity-60" : ""}>
                  <TableCell className="font-medium flex items-center gap-2">
                    {film.title}
                    {film.isHidden && <EyeOff className="w-4 h-4 text-muted-foreground" />}
                  </TableCell>
                  <TableCell>{film.director}</TableCell>
                  <TableCell>{film.year}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleShare(film)} title="Partager">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => toggleHideMutation.mutate({ id: film.id, isHidden: film.isHidden })} title={film.isHidden ? "Afficher" : "Masquer"}>
                        {film.isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => {
                        setEditingFilm(film);
                        setIsOpen(true);
                      }} title="Modifier">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => remove.mutate(film.id)} className="text-destructive hover:bg-destructive/10" title="Supprimer">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Dashboard>
  );
}
