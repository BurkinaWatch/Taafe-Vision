import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

export function useFilms() {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: [api.films.list.path],
    queryFn: async () => {
      const res = await fetch(api.films.list.path);
      if (!res.ok) throw new Error("Failed to fetch films");
      return api.films.list.responses[200].parse(await res.json());
    },
  });

  const create = useMutation({
    mutationFn: async (data: z.infer<typeof api.films.create.input>) => {
      const res = await fetch(api.films.create.path, {
        method: api.films.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create film");
      return api.films.create.responses[201].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.films.list.path] }),
  });

  const remove = useMutation({
    mutationFn: async (id: number) => {
      const url = api.films.delete.path.replace(":id", id.toString());
      const res = await fetch(url, { method: api.films.delete.method });
      if (!res.ok) throw new Error("Failed to delete film");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.films.list.path] }),
  });

  return { films: list.data, isLoading: list.isLoading, create, remove };
}
