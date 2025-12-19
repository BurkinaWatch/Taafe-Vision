import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type Project } from "@shared/routes";
import { z } from "zod";

export function useProjects() {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: [api.projects.list.path],
    queryFn: async () => {
      const res = await fetch(api.projects.list.path);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return api.projects.list.responses[200].parse(await res.json());
    },
  });

  const create = useMutation({
    mutationFn: async (data: z.infer<typeof api.projects.create.input>) => {
      const res = await fetch(api.projects.create.path, {
        method: api.projects.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create project");
      return api.projects.create.responses[201].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.projects.list.path] }),
  });

  const remove = useMutation({
    mutationFn: async (id: number) => {
      const url = api.projects.delete.path.replace(":id", id.toString());
      const res = await fetch(url, { method: api.projects.delete.method });
      if (!res.ok) throw new Error("Failed to delete project");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.projects.list.path] }),
  });

  return { projects: list.data, isLoading: list.isLoading, create, remove };
}
