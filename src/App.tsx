import { useState } from 'react';

import { PokemonList } from './components/PokemonList';
import { PokemonModal } from './components/PokemonModal';
import { Toolbar } from './components/Toolbar';

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <h1 className="text-2xl font-bold">Pokédex</h1>
          <p className="mt-1 text-sm text-slate-500">
            Browse the first 150 Pokémon and save your favorites.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <Toolbar />
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
