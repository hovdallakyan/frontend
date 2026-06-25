import { useCallback, useEffect, useRef, useState } from 'react';

import { usePokemonDetail } from '../api/pokemon';
import { useFavoriteToggle } from '../hooks/useFavoriteToggle';
import { formatAbilityName, formatDexNumber } from '../lib/pokemonFormat';
import { CloseIcon, ChevronRightIcon, StarIcon } from './icons';
import { getTypeTint } from '../lib/typeStyles';
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
  const [isClosing, setIsClosing] = useState(false);

  const { isFavorite, toggle, isPending } = useFavoriteToggle({
    pokemonId,
    name: data?.name ?? '',
    sprite: data?.sprite ?? '',
  });

  const handleClose = useCallback(() => {
    setIsClosing(true);
    window.setTimeout(onClose, 200);
  }, [onClose]);

  useEffect(() => {
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
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
  }, [handleClose]);

  const typeTint = data ? getTypeTint(data.types) : 'from-slate-100 to-white';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm ${
        isClosing ? 'animate-fade-in opacity-0 transition-opacity duration-200' : 'animate-fade-in'
      }`}
      onClick={handleClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pokemon-modal-title"
        className={`relative max-h-[90vh] w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 ${
          isClosing ? 'animate-slide-down' : 'animate-slide-up'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          type="button"
          aria-label="Close"
          onClick={handleClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm ring-1 ring-slate-200/80 transition-colors hover:bg-white hover:text-slate-800"
        >
          <CloseIcon className="h-4 w-4" />
        </button>

        {isLoading && (
          <div className="p-6">
            <LoadingSkeleton count={1} variant="modal" />
          </div>
        )}
        {isError && (
          <div className="p-6">
            <ErrorState
              message="Failed to load Pokémon details."
              onRetry={() => refetch()}
            />
          </div>
        )}

        {data && (
          <>
            <div
              className={`bg-gradient-to-b ${typeTint} px-6 pb-6 pt-8 text-center`}
            >
              <span className="font-mono text-sm font-bold text-slate-400">
                {formatDexNumber(data.id)}
              </span>

              <div className="mx-auto mt-2 flex h-36 w-36 items-center justify-center rounded-full bg-white/70 shadow-inner ring-1 ring-white/80">
                <img
                  src={data.sprite}
                  alt={data.name}
                  width={120}
                  height={120}
                  className="h-28 w-28 object-contain drop-shadow-md"
                />
              </div>

              <h2
                id="pokemon-modal-title"
                className="mt-3 text-3xl font-extrabold capitalize text-slate-900"
              >
                {data.name}
              </h2>

              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {data.types.map((type) => (
                  <TypeBadge key={type} type={type} size="md" />
                ))}
              </div>

              <button
                type="button"
                disabled={isPending}
                onClick={toggle}
                className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all disabled:opacity-50 ${
                  isFavorite
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30 hover:bg-amber-600'
                    : 'border-2 border-amber-300 bg-white text-amber-700 hover:bg-amber-50'
                }`}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <StarIcon className="h-4 w-4" filled={isFavorite} />
                {isFavorite ? 'Favorited' : 'Add to favorites'}
              </button>
            </div>

            <div className="max-h-[40vh] overflow-y-auto px-6 pb-6">
              <section className="mt-2">
                <h3 className="mb-2 text-xs font-extrabold uppercase tracking-widest text-slate-400">
                  Abilities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.abilities.map((ability) => (
                    <span
                      key={ability}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold capitalize text-slate-700 ring-1 ring-slate-200/80"
                    >
                      {formatAbilityName(ability)}
                    </span>
                  ))}
                </div>
              </section>

              {data.evolutions.length > 0 && (
                <section className="mt-6">
                  <h3 className="mb-3 text-xs font-extrabold uppercase tracking-widest text-slate-400">
                    Evolution Line
                  </h3>
                  <div className="flex flex-wrap items-center justify-center gap-1">
                    {data.evolutions.map((evo, index) => (
                      <div key={evo.id} className="flex items-center gap-1">
                        {index > 0 && (
                          <ChevronRightIcon className="h-4 w-4 shrink-0 text-slate-300" />
                        )}
                        <button
                          type="button"
                          onClick={() => onSelectEvolution(evo.id)}
                          className={`flex flex-col items-center rounded-xl border p-2.5 transition-all hover:shadow-md ${
                            evo.id === data.id
                              ? 'border-brand bg-brand/5 ring-2 ring-brand/20'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          {evo.sprite && (
                            <img
                              src={evo.sprite}
                              alt={evo.name}
                              loading="lazy"
                              width={56}
                              height={56}
                              className="h-14 w-14 object-contain"
                            />
                          )}
                          <span className="mt-1 text-xs font-bold capitalize text-slate-700">
                            {evo.name}
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
