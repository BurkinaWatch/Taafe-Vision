import { useQuery } from "@tanstack/react-query";
import { api, type Festival } from "@/lib/api";

export function useFestival(slug: string) {
  const festivalQuery = useQuery<Festival>({
    queryKey: [api.festivals.get.path, slug],
    queryFn: async () => {
      const url = api.festivals.get.path.replace(":slug", encodeURIComponent(slug));
      const response = await fetch(url, { credentials: "include" });

      if (!response.ok) {
        throw new Error("Impossible de charger les informations du festival.");
      }

      return api.festivals.get.responses[200].parse(await response.json()) as Festival;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return {
    festival: festivalQuery.data,
    isLoading: festivalQuery.isLoading,
    isError: festivalQuery.isError,
    error: festivalQuery.error,
    refetch: festivalQuery.refetch,
  };
}