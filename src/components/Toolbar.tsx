import { useUiStore } from '../store/useUiStore';
import { SearchIcon, StarIcon } from './icons';

interface ToolbarProps {
  filteredCount: number;
  totalCount: number;
  isLoading?: boolean;
}

export function Toolbar({ filteredCount, totalCount, isLoading }: ToolbarProps) {
  const search = useUiStore((s) => s.search);
  const setSearch = useUiStore((s) => s.setSearch);
  const favoritesOnly = useUiStore((s) => s.favoritesOnly);
  const setFavoritesOnly = useUiStore((s) => s.setFavoritesOnly);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm ring-1 ring-slate-900/5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search by name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20"
            aria-label="Search Pokémon by name"
          />
        </div>

        <div className="flex items-center gap-3">
          <div
            className="flex rounded-xl bg-slate-100 p-1"
            role="group"
            aria-label="Filter Pokémon"
          >
            <button
              type="button"
              onClick={() => setFavoritesOnly(false)}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                !favoritesOnly
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFavoritesOnly(true)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                favoritesOnly
                  ? 'bg-amber-100 text-amber-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <StarIcon className="h-3.5 w-3.5" filled={favoritesOnly} />
              Favorites
            </button>
          </div>
        </div>
      </div>

      {!isLoading && (
        <p className="mt-2.5 text-xs font-semibold text-slate-400">
          Showing {filteredCount} of {totalCount} Pokémon
        </p>
      )}
    </div>
  );
}
