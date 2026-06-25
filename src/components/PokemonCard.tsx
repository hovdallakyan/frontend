import type { PokemonSummary } from '../types/pokemon';
import { useFavoriteToggle } from '../hooks/useFavoriteToggle';
import { formatDexNumber } from '../lib/pokemonFormat';
import { StarIcon } from './icons';
import { TypeBadge } from './TypeBadge';

interface PokemonCardProps {
  pokemon: PokemonSummary;
  onClick: () => void;
  style?: React.CSSProperties;
}

export function PokemonCard({ pokemon, onClick, style }: PokemonCardProps) {
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
      style={style}
      className={`group relative flex cursor-pointer flex-col items-center rounded-2xl border bg-gradient-to-b from-white to-slate-50/80 p-4 shadow-sm ring-1 ring-slate-900/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand animate-stagger-in ${
        isFavorite
          ? 'border-amber-300 bg-gradient-to-b from-amber-50/80 to-white ring-amber-200/60'
          : 'border-slate-200/80'
      }`}
    >
      <span className="absolute left-3 top-2.5 font-mono text-[11px] font-semibold text-slate-400">
        {formatDexNumber(pokemon.id)}
      </span>

      <button
        type="button"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        disabled={isPending}
        onClick={toggle}
        className={`absolute right-2 top-2 rounded-full p-1.5 transition-all hover:scale-110 hover:bg-amber-100 disabled:opacity-50 ${
          isFavorite ? 'text-amber-500 animate-star-bounce' : 'text-slate-300 hover:text-amber-400'
        }`}
      >
        <StarIcon className="h-5 w-5" filled={isFavorite} />
      </button>

      <div className="mt-1 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100/80 ring-1 ring-slate-200/60 transition-transform duration-200 group-hover:scale-105">
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          loading="lazy"
          width={80}
          height={80}
          className="h-20 w-20 object-contain"
        />
      </div>

      <h3 className="mt-3 text-center text-sm font-bold capitalize text-slate-800">
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
