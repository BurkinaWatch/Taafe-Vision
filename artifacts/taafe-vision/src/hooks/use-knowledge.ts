import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

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

export function useResearchSources() {
  const { data, isLoading } = useQuery({
    queryKey: [api.knowledge.sources.path],
    queryFn: async () => {
      const res = await fetch(api.knowledge.sources.path);
      if (!res.ok) throw new Error("Failed to fetch sources");
      return res.json();
    },
  });
  return { sources: data ?? [], isLoading };
}

export function useSocialLinks() {
  const { data, isLoading } = useQuery({
    queryKey: [api.knowledge.socials.path],
    queryFn: async () => {
      const res = await fetch(api.knowledge.socials.path);
      if (!res.ok) throw new Error("Failed to fetch social links");
      return res.json();
    },
  });
  return { socials: data ?? [], isLoading };
}
