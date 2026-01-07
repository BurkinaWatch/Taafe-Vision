import { useQuery, useMutation } from "@tanstack/react-query";
import { Article, insertArticleSchema } from "@shared/schema";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";

export default function ArticlesManager() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const { data: articles, isLoading } = useQuery<Article[]>({ 
    queryKey: ["/api/articles"] 
  });

  const form = useForm({
    resolver: zodResolver(insertArticleSchema),
    defaultValues: {
      title: "",
      content: "",
      imageUrl: "",
      category: "news",
      isHidden: false,
    },
  });

  useEffect(() => {
    if (editingArticle) {
      form.reset({
        title: editingArticle.title,
        content: editingArticle.content,
        imageUrl: editingArticle.imageUrl || "",
        category: editingArticle.category,
        isHidden: editingArticle.isHidden,
      });
    } else {
      form.reset({
        title: "",
        content: "",
        imageUrl: "",
        category: "news",
        isHidden: false,
      });
    }
  }, [editingArticle, form]);

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editingArticle) {
        await apiRequest("PATCH", `/api/articles/${editingArticle.id}`, data);
      } else {
        await apiRequest("POST", "/api/articles", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      setOpen(false);
      setEditingArticle(null);
      form.reset();
      toast({ title: editingArticle ? "Article mis à jour" : "Article publié" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/articles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({ title: "Article supprimé" });
    },
  });

  const toggleHideMutation = useMutation({
    mutationFn: async ({ id, isHidden }: { id: number, isHidden: boolean }) => {
      await apiRequest("PATCH", `/api/articles/${id}`, { isHidden: !isHidden });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({ title: "Visibilité mise à jour" });
    },
  });

  const handleShare = (article: Article) => {
    const url = `${window.location.origin}/articles/${article.id}`;
    navigator.clipboard.writeText(url);
    toast({ title: "Lien copié dans le presse-papier" });
  };

  return (
    <Dashboard>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-primary">Gestion des Articles</h1>
        <Dialog open={open} onOpenChange={(val) => {
          setOpen(val);
          if (!val) setEditingArticle(null);
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> Nouvel Article
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingArticle ? "Modifier l'Article" : "Publier un Article"}</DialogTitle>
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
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catégorie</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une catégorie" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="news">Actualité</SelectItem>
                          <SelectItem value="event">Événement</SelectItem>
                          <SelectItem value="training">Formation</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contenu</FormLabel>
                      <FormControl><Textarea {...field} className="min-h-[200px]" /></FormControl>
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
                <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                  {editingArticle ? "Mettre à jour" : "Publier"}
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
          articles?.map((article) => (
            <div key={article.id} className={`bg-white p-6 rounded-xl shadow-sm border border-border flex justify-between items-center ${article.isHidden ? "opacity-60" : ""}`}>
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  {article.title}
                  {article.isHidden && <EyeOff className="w-4 h-4 text-muted-foreground" />}
                </h3>
                <span className="text-xs uppercase tracking-widest bg-primary/10 text-primary px-2 py-1 rounded">{article.category}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleShare(article)} title="Partager">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => toggleHideMutation.mutate({ id: article.id, isHidden: article.isHidden })} title={article.isHidden ? "Afficher" : "Masquer"}>
                  {article.isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => {
                  setEditingArticle(article);
                  setOpen(true);
                }} title="Modifier">
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(article.id)} title="Supprimer">
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
