import { useQuery, useMutation } from "@tanstack/react-query";
import { Project, insertProjectSchema } from "@shared/schema";
import Dashboard from "./Dashboard";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Pencil, Eye, EyeOff, Share2 } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";

export default function ProjectsManager() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { data: projects, isLoading } = useQuery<Project[]>({ 
    queryKey: ["/api/projects"] 
  });

  const form = useForm({
    resolver: zodResolver(insertProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      date: "",
      isHidden: false,
    },
  });

  useEffect(() => {
    if (editingProject) {
      form.reset({
        title: editingProject.title,
        description: editingProject.description,
        imageUrl: editingProject.imageUrl,
        date: editingProject.date || "",
        isHidden: editingProject.isHidden,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        imageUrl: "",
        date: "",
        isHidden: false,
      });
    }
  }, [editingProject, form]);

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editingProject) {
        await apiRequest("PATCH", `/api/projects/${editingProject.id}`, data);
      } else {
        await apiRequest("POST", "/api/projects", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setOpen(false);
      setEditingProject(null);
      form.reset();
      toast({ title: editingProject ? "Projet mis à jour" : "Projet créé avec succès" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Projet supprimé" });
    },
  });

  const toggleHideMutation = useMutation({
    mutationFn: async ({ id, isHidden }: { id: number, isHidden: boolean }) => {
      await apiRequest("PATCH", `/api/projects/${id}`, { isHidden: !isHidden });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Visibilité mise à jour" });
    },
  });

  const handleShare = (project: Project) => {
    const url = `${window.location.origin}/projects/${project.id}`;
    navigator.clipboard.writeText(url);
    toast({ title: "Lien copié dans le presse-papier" });
  };

  return (
    <Dashboard>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-primary">Gestion des Projets</h1>
        <Dialog open={open} onOpenChange={(val) => {
          setOpen(val);
          if (!val) setEditingProject(null);
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> Nouveau Projet
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingProject ? "Modifier le Projet" : "Ajouter un Projet"}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => createMutation.mutate(data))} className="space-y-4">
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
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl><Textarea {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL de l'image</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date / Période</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                  {editingProject ? "Mettre à jour" : "Enregistrer"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          projects?.map((project) => (
            <div key={project.id} className={`bg-white p-6 rounded-xl shadow-sm border border-border flex justify-between items-center ${project.isHidden ? "opacity-60" : ""}`}>
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  {project.title}
                  {project.isHidden && <EyeOff className="w-4 h-4 text-muted-foreground" />}
                </h3>
                <p className="text-sm text-muted-foreground">{project.date}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleShare(project)} title="Partager">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => toggleHideMutation.mutate({ id: project.id, isHidden: project.isHidden })} title={project.isHidden ? "Afficher" : "Masquer"}>
                  {project.isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => {
                  setEditingProject(project);
                  setOpen(true);
                }} title="Modifier">
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(project.id)} title="Supprimer">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </Dashboard>
  );
}
