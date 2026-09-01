import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

export function usePartners() {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: [api.partners.list.path],
    queryFn: async () => {
      const res = await fetch(api.partners.list.path);
      if (!res.ok) throw new Error("Failed to fetch partners");
      return api.partners.list.responses[200].parse(await res.json());
    },
  });

  const create = useMutation({
    mutationFn: async (data: z.infer<typeof api.partners.create.input>) => {
      const res = await fetch(api.partners.create.path, {
        method: api.partners.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create partner");
      return api.partners.create.responses[201].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.partners.list.path] }),
  });

  const remove = useMutation({
    mutationFn: async (id: number) => {
      const url = api.partners.delete.path.replace(":id", id.toString());
      const res = await fetch(url, { method: api.partners.delete.method });
      if (!res.ok) throw new Error("Failed to delete partner");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.partners.list.path] }),
  });

  return { partners: list.data, isLoading: list.isLoading, create, remove };
}
