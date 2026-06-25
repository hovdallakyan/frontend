import { useUiStore } from '../store/useUiStore';

export function Toolbar() {
  const search = useUiStore((s) => s.search);
  const setSearch = useUiStore((s) => s.setSearch);
  const favoritesOnly = useUiStore((s) => s.favoritesOnly);
  const toggleFavoritesOnly = useUiStore((s) => s.toggleFavoritesOnly);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <input
        type="search"
        placeholder="Search by name…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:max-w-xs"
        aria-label="Search Pokémon by name"
      />

      <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={favoritesOnly}
          onChange={toggleFavoritesOnly}
          className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
        />
        Show favorites only
      </label>
    </div>
  );
}
