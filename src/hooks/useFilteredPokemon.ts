import { useFavorites } from '../api/favorites';
import { usePokemonList } from '../api/pokemon';
import { useDebounce } from './useDebounce';
import { useUiStore } from '../store/useUiStore';

export function useFilteredPokemon() {
  const { data: pokemon = [], isLoading, isError, refetch } = usePokemonList();
  const { data: favorites = [] } = useFavorites();
  const search = useUiStore((s) => s.search);
  const favoritesOnly = useUiStore((s) => s.favoritesOnly);
  const debouncedSearch = useDebounce(search);

  const favoriteIds = new Set(favorites.map((f) => f.pokemonId));
  const query = debouncedSearch.trim().toLowerCase();

  const filtered = pokemon.filter((p) => {
    if (favoritesOnly && !favoriteIds.has(p.id)) return false;
    if (query && !p.name.toLowerCase().includes(query)) return false;
    return true;
  });

  return {
    filtered,
    total: pokemon.length,
    isLoading,
    isError,
    refetch,
    debouncedSearch,
    favoritesOnly,
    favoriteCount: favorites.length,
  };
}
