import { useState } from 'react';

import { useFilteredPokemon } from './hooks/useFilteredPokemon';
import { PokemonList } from './components/PokemonList';
import { PokemonModal } from './components/PokemonModal';
import { PokeballIcon } from './components/icons';
import { Toolbar } from './components/Toolbar';

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { filtered, total, isLoading } = useFilteredPokemon();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand shadow-md shadow-brand/25 ring-2 ring-white">
            <PokeballIcon className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
              Pokédex
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Gen 1 · 150 Pokémon
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <Toolbar
          filteredCount={filtered.length}
          totalCount={total}
          isLoading={isLoading}
        />
        <div className="mt-6">
          <PokemonList onSelect={setSelectedId} />
        </div>
      </main>

      {selectedId !== null && (
        <PokemonModal
          pokemonId={selectedId}
          onClose={() => setSelectedId(null)}
          onSelectEvolution={setSelectedId}
        />
      )}
    </div>
  );
}

export default App;
