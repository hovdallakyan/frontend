import type { PokemonSummary } from '../types/pokemon';
import { useFavoriteToggle } from '../hooks/useFavoriteToggle';
import { TypeBadge } from './TypeBadge';

interface PokemonCardProps {
  pokemon: PokemonSummary;
  onClick: () => void;
}

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const { isFavorite, toggle, isPending } = useFavoriteToggle({
    pokemonId: pokemon.id,
    name: pokemon.name,
    sprite: pokemon.sprite,
  });

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group relative flex cursor-pointer flex-col items-center rounded-xl border bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
        isFavorite ? 'border-amber-400 ring-2 ring-amber-200' : 'border-slate-200'
      }`}
    >
      <button
        type="button"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        disabled={isPending}
        onClick={toggle}
        className="absolute right-2 top-2 rounded-full p-1 text-xl transition-transform hover:scale-110 disabled:opacity-50"
      >
        {isFavorite ? '★' : '☆'}
      </button>

      <img
        src={pokemon.sprite}
        alt={pokemon.name}
        loading="lazy"
        width={96}
        height={96}
        className="h-24 w-24 object-contain transition-transform duration-200 group-hover:scale-105"
      />

      <h3 className="mt-2 text-center text-sm font-semibold capitalize">
        {pokemon.name}
      </h3>

      <div className="mt-2 flex flex-wrap justify-center gap-1">
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>
    </article>
  );
}
