import { useEffect, useRef, useState } from 'react';

import { useFilteredPokemon } from '../hooks/useFilteredPokemon';
import { EmptyState } from './EmptyState';
import { ErrorState } from './ErrorState';
import { LoadingSkeleton } from './LoadingSkeleton';
import { PokemonCard } from './PokemonCard';

const PAGE_SIZE = 20;

interface PokemonListProps {
  onSelect: (id: number) => void;
}

function LoadingMore() {
  return (
    <div className="flex items-center justify-center gap-2 py-8 text-sm font-semibold text-slate-400">
      <span className="inline-block h-4 w-4 animate-spin-slow rounded-full border-2 border-slate-200 border-t-brand" />
      Loading more…
    </div>
  );
}

export function PokemonList({ onSelect }: PokemonListProps) {
  const { filtered, isLoading, isError, refetch, debouncedSearch, favoritesOnly } =
    useFilteredPokemon();

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [debouncedSearch, favoritesOnly]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((c) => Math.min(c + PAGE_SIZE, filtered.length));
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filtered.length]);

  if (isLoading) return <LoadingSkeleton />;
  if (isError) {
    return (
      <ErrorState
        message="Failed to load Pokémon. Please try again."
        onRetry={() => refetch()}
      />
    );
  }
  if (filtered.length === 0) {
    return (
      <EmptyState
        variant={favoritesOnly ? 'favorites' : debouncedSearch ? 'search' : 'default'}
        message={
          favoritesOnly
            ? 'No favorite Pokémon yet'
            : debouncedSearch
              ? `No Pokémon matching "${debouncedSearch}"`
              : 'No Pokémon found'
        }
        hint={
          favoritesOnly
            ? 'Star some Pokémon to build your collection!'
            : debouncedSearch
              ? 'Try a different search term.'
              : undefined
        }
      />
    );
  }

  const visible = filtered.slice(0, visibleCount);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {visible.map((p, index) => (
          <PokemonCard
            key={p.id}
            pokemon={p}
            onClick={() => onSelect(p.id)}
            style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
          />
        ))}
      </div>
      {visibleCount < filtered.length && (
        <div ref={sentinelRef}>
          <LoadingMore />
        </div>
      )}
    </>
  );
}
