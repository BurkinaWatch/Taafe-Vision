import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

export function useArticles() {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: [api.articles.list.path],
    queryFn: async () => {
      const res = await fetch(api.articles.list.path);
      if (!res.ok) throw new Error("Failed to fetch articles");
      return api.articles.list.responses[200].parse(await res.json());
    },
  });

  const create = useMutation({
    mutationFn: async (data: z.infer<typeof api.articles.create.input>) => {
      const res = await fetch(api.articles.create.path, {
        method: api.articles.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create article");
      return api.articles.create.responses[201].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.articles.list.path] }),
  });

  const remove = useMutation({
    mutationFn: async (id: number) => {
      const url = api.articles.delete.path.replace(":id", id.toString());
      const res = await fetch(url, { method: api.articles.delete.method });
      if (!res.ok) throw new Error("Failed to delete article");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.articles.list.path] }),
  });

  return { articles: list.data, isLoading: list.isLoading, create, remove };
}
