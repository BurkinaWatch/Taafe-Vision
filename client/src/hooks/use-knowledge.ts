import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useImpactMetrics() {
  const { data, isLoading } = useQuery({
    queryKey: [api.knowledge.metrics.path],
    queryFn: async () => {
      const res = await fetch(api.knowledge.metrics.path);
      if (!res.ok) throw new Error("Failed to fetch metrics");
      return res.json();
    },
  });
  return { metrics: data ?? [], isLoading };
}

export function useOrganizationProfile() {
  const { data, isLoading } = useQuery({
    queryKey: [api.knowledge.profile.path],
    queryFn: async () => {
      const res = await fetch(api.knowledge.profile.path);
      if (!res.ok) return null;
      return res.json();
    },
  });
  return { profile: data ?? null, isLoading };
}
