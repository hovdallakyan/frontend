import { useEffect, useRef } from 'react';

import { usePokemonDetail } from '../api/pokemon';
import { useFavoriteToggle } from '../hooks/useFavoriteToggle';
import { TypeBadge } from './TypeBadge';
import { ErrorState } from './ErrorState';
import { LoadingSkeleton } from './LoadingSkeleton';

interface PokemonModalProps {
  pokemonId: number;
  onClose: () => void;
  onSelectEvolution: (id: number) => void;
}

export function PokemonModal({
  pokemonId,
  onClose,
  onSelectEvolution,
}: PokemonModalProps) {
  const { data, isLoading, isError, refetch } = usePokemonDetail(pokemonId);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const { isFavorite, toggle, isPending } = useFavoriteToggle({
    pokemonId,
    name: data?.name ?? '',
    sprite: data?.sprite ?? '',
  });

  useEffect(() => {
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pokemon-modal-title"
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          ✕
        </button>

        {isLoading && <LoadingSkeleton />}
        {isError && (
          <ErrorState
            message="Failed to load Pokémon details."
            onRetry={() => refetch()}
          />
        )}

        {data && (
          <div className="flex flex-col items-center">
            <img
              src={data.sprite}
              alt={data.name}
              width={120}
              height={120}
              className="h-30 w-30 object-contain"
            />

            <h2
              id="pokemon-modal-title"
              className="mt-2 text-2xl font-bold capitalize"
            >
              {data.name}
            </h2>

            <button
              type="button"
              disabled={isPending || !data}
              onClick={toggle}
              className="mt-2 rounded-full px-3 py-1 text-lg transition-colors hover:bg-amber-50 disabled:opacity-50"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '★ Favorited' : '☆ Add to favorites'}
            </button>

            <section className="mt-6 w-full">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Types
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.types.map((type) => (
                  <TypeBadge key={type} type={type} />
                ))}
              </div>
            </section>

            <section className="mt-6 w-full">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Abilities
              </h3>
              <ul className="list-inside list-disc capitalize text-slate-700">
                {data.abilities.map((ability) => (
                  <li key={ability}>{ability.replace('-', ' ')}</li>
                ))}
              </ul>
            </section>

            {data.evolutions.length > 0 && (
              <section className="mt-6 w-full">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Evolution Line
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {data.evolutions.map((evo) => (
                    <button
                      key={evo.id}
                      type="button"
                      onClick={() => onSelectEvolution(evo.id)}
                      className={`flex flex-col items-center rounded-lg border p-3 transition-colors hover:bg-slate-50 ${
                        evo.id === data.id
                          ? 'border-blue-400 bg-blue-50'
                          : 'border-slate-200'
                      }`}
                    >
                      {evo.sprite && (
                        <img
                          src={evo.sprite}
                          alt={evo.name}
                          loading="lazy"
                          width={64}
                          height={64}
                          className="h-16 w-16 object-contain"
                        />
                      )}
                      <span className="mt-1 text-xs font-medium capitalize">
                        {evo.name}
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
