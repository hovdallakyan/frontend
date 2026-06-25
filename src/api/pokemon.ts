import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";
import type { PokemonDetail, PokemonSummary } from "../types/pokemon";

export const pokemonKeys = {
  all: ["pokemon"] as const,
  list: () => [...pokemonKeys.all, "list"] as const,
  detail: (id: number) => [...pokemonKeys.all, "detail", id] as const,
};

export function usePokemonList() {
  return useQuery({
    queryKey: pokemonKeys.list(),
    queryFn: () => apiFetch<PokemonSummary[]>("/pokemon"),
  });
}

export function usePokemonDetail(id: number | null) {
  return useQuery({
    queryKey: pokemonKeys.detail(id ?? 0),
    queryFn: () => apiFetch<PokemonDetail>(`/pokemon/${id}`),
    enabled: id !== null,
  });
}
