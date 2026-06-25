import { useAddFavorite, useFavorites, useRemoveFavorite } from '../api/favorites';

interface PokemonRef {
  pokemonId: number;
  name: string;
  sprite: string;
}

export function useFavoriteToggle(pokemon: PokemonRef) {
  const { data: favorites = [] } = useFavorites();
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const isFavorite = favorites.some((f) => f.pokemonId === pokemon.pokemonId);

  const toggle = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isFavorite) {
      removeFavorite.mutate(pokemon.pokemonId);
    } else {
      addFavorite.mutate(pokemon);
    }
  };

  return {
    isFavorite,
    toggle,
    isPending: addFavorite.isPending || removeFavorite.isPending,
  };
}
