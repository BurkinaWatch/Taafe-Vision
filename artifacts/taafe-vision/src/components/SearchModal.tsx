import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Film, FileText, FolderOpen, Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useFilms } from "@/hooks/use-films";
import { useArticles } from "@/hooks/use-articles";
import { useProjects } from "@/hooks/use-projects";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");

  const { films } = useFilms();
  const { articles } = useArticles();
  const { projects } = useProjects();

  // Reset query when closed
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onOpenChange]);

  const q = query.toLowerCase().trim();

  const filteredFilms = (films ?? []).filter(
    (f) =>
      !q ||
      f.title.toLowerCase().includes(q) ||
      f.director.toLowerCase().includes(q) ||
      f.synopsis.toLowerCase().includes(q)
  );

  const filteredArticles = (articles ?? []).filter(
    (a) =>
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.content.toLowerCase().includes(q)
  );

  const filteredProjects = (projects ?? []).filter(
    (p) =>
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );

  const hasResults =
    filteredFilms.length > 0 ||
    filteredArticles.length > 0 ||
    filteredProjects.length > 0;

  function go(path: string) {
    navigate(path);
    onOpenChange(false);
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Rechercher un film, article, programme…"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        {!hasResults && (
          <CommandEmpty>
            {q ? `Aucun résultat pour « ${query} ».` : "Commencez à taper pour chercher."}
          </CommandEmpty>
        )}

        {filteredFilms.length > 0 && (
          <CommandGroup heading="Films">
            {filteredFilms.slice(0, 6).map((film) => (
              <CommandItem
                key={film.id}
                value={`film-${film.id}-${film.title}`}
                onSelect={() => go(`/films/${film.id}`)}
                className="cursor-pointer"
              >
                <Film className="mr-2 h-4 w-4 text-secondary shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="font-medium truncate">{film.title}</span>
                  <span className="text-xs text-muted-foreground truncate">
                    {film.director} · {film.year}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {filteredFilms.length > 0 && filteredArticles.length > 0 && (
          <CommandSeparator />
        )}

        {filteredArticles.length > 0 && (
          <CommandGroup heading="Articles & Actualités">
            {filteredArticles.slice(0, 5).map((article) => (
              <CommandItem
                key={article.id}
                value={`article-${article.id}-${article.title}`}
                onSelect={() => go("/news")}
                className="cursor-pointer"
              >
                <FileText className="mr-2 h-4 w-4 text-secondary shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="font-medium truncate">{article.title}</span>
                  <span className="text-xs text-muted-foreground capitalize">
                    {article.category}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {filteredArticles.length > 0 && filteredProjects.length > 0 && (
          <CommandSeparator />
        )}

        {filteredProjects.length > 0 && (
          <CommandGroup heading="Programmes & Projets">
            {filteredProjects.slice(0, 5).map((project) => (
              <CommandItem
                key={project.id}
                value={`project-${project.id}-${project.title}`}
                onSelect={() => go("/projects")}
                className="cursor-pointer"
              >
                <FolderOpen className="mr-2 h-4 w-4 text-secondary shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="font-medium truncate">{project.title}</span>
                  {project.date && (
                    <span className="text-xs text-muted-foreground">{project.date}</span>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>

      <div className="border-t px-3 py-2 flex items-center gap-4 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[9px]">↑↓</kbd>
          naviguer
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[9px]">↵</kbd>
          ouvrir
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[9px]">Esc</kbd>
          fermer
        </span>
        <span className="ml-auto flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[9px]">⌘K</kbd>
          raccourci
        </span>
      </div>
    </CommandDialog>
  );
}
