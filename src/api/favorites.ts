import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";
import { beginOptimistic, rollback } from "../utils/optimistic";
import type { Favorite } from "../types/pokemon";

export const favoritesKey = ["favorites"] as const;

export function useFavorites() {
  return useQuery({
    queryKey: favoritesKey,
    queryFn: () => apiFetch<Favorite[]>("/favorites"),
  });
}

type NewFavorite = Pick<Favorite, "pokemonId" | "name" | "sprite">;

export function useAddFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ pokemonId }: NewFavorite) =>
      apiFetch<Favorite>("/favorites", {
        method: "POST",
        body: JSON.stringify({ pokemonId }),
      }),
    onMutate: async (pokemon) => {
      const { previous } = await beginOptimistic<Favorite[]>(
        queryClient,
        favoritesKey,
      );
      const optimistic: Favorite = {
        ...pokemon,
        createdAt: new Date().toISOString(),
      };
      queryClient.setQueryData<Favorite[]>(favoritesKey, (old = []) =>
        old.some((f) => f.pokemonId === pokemon.pokemonId)
          ? old
          : [...old, optimistic],
      );
      return { previous };
    },
    onError: (_err, _pokemon, context) => {
      rollback(queryClient, favoritesKey, context?.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: favoritesKey }),
  });
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (pokemonId: number) =>
      apiFetch<void>(`/favorites/${pokemonId}`, { method: "DELETE" }),
    onMutate: async (pokemonId) => {
      const { previous } = await beginOptimistic<Favorite[]>(
        queryClient,
        favoritesKey,
      );
      queryClient.setQueryData<Favorite[]>(favoritesKey, (old = []) =>
        old.filter((f) => f.pokemonId !== pokemonId),
      );
      return { previous };
    },
    onError: (_err, _pokemonId, context) => {
      rollback(queryClient, favoritesKey, context?.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: favoritesKey }),
  });
}
