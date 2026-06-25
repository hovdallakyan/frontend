import { useEffect, useRef, useState } from 'react';

import { useFavorites } from '../api/favorites';
import { usePokemonList } from '../api/pokemon';
import { useDebounce } from '../hooks/useDebounce';
import { useUiStore } from '../store/useUiStore';
import { EmptyState } from './EmptyState';
import { ErrorState } from './ErrorState';
import { LoadingSkeleton } from './LoadingSkeleton';
import { PokemonCard } from './PokemonCard';

const PAGE_SIZE = 20;

interface PokemonListProps {
  onSelect: (id: number) => void;
}

export function PokemonList({ onSelect }: PokemonListProps) {
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
        message={
          favoritesOnly
            ? 'No favorite Pokémon yet. Star some Pokémon to see them here!'
            : debouncedSearch
              ? `No Pokémon matching "${debouncedSearch}".`
              : 'No Pokémon found.'
        }
      />
    );
  }

  const visible = filtered.slice(0, visibleCount);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 animate-fade-in">
        {visible.map((p) => (
          <PokemonCard key={p.id} pokemon={p} onClick={() => onSelect(p.id)} />
        ))}
      </div>
      {visibleCount < filtered.length && (
        <div ref={sentinelRef} className="py-8 text-center text-sm text-slate-400">
          Loading more…
        </div>
      )}
    </>
  );
}
