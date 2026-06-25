const TYPE_STYLES: Record<string, string> = {
  normal: 'bg-gradient-to-r from-stone-400 to-stone-500',
  fire: 'bg-gradient-to-r from-orange-400 to-red-500',
  water: 'bg-gradient-to-r from-blue-400 to-cyan-500',
  electric: 'bg-gradient-to-r from-yellow-300 to-yellow-500 text-yellow-900',
  grass: 'bg-gradient-to-r from-green-400 to-emerald-600',
  ice: 'bg-gradient-to-r from-cyan-200 to-sky-400 text-cyan-900',
  fighting: 'bg-gradient-to-r from-red-600 to-red-800',
  poison: 'bg-gradient-to-r from-purple-400 to-purple-600',
  ground: 'bg-gradient-to-r from-amber-500 to-yellow-700',
  flying: 'bg-gradient-to-r from-indigo-300 to-violet-400',
  psychic: 'bg-gradient-to-r from-pink-400 to-rose-500',
  bug: 'bg-gradient-to-r from-lime-400 to-green-500 text-lime-900',
  rock: 'bg-gradient-to-r from-yellow-600 to-amber-800',
  ghost: 'bg-gradient-to-r from-violet-500 to-purple-700',
  dragon: 'bg-gradient-to-r from-indigo-500 to-violet-700',
  dark: 'bg-gradient-to-r from-neutral-600 to-neutral-800',
  steel: 'bg-gradient-to-r from-slate-300 to-slate-500 text-slate-900',
  fairy: 'bg-gradient-to-r from-pink-200 to-rose-400 text-pink-900',
};

const TYPE_TINTS: Record<string, string> = {
  normal: 'from-stone-100 to-stone-50',
  fire: 'from-orange-100 to-red-50',
  water: 'from-blue-100 to-cyan-50',
  electric: 'from-yellow-100 to-amber-50',
  grass: 'from-green-100 to-emerald-50',
  ice: 'from-cyan-100 to-sky-50',
  fighting: 'from-red-100 to-rose-50',
  poison: 'from-purple-100 to-fuchsia-50',
  ground: 'from-amber-100 to-yellow-50',
  flying: 'from-indigo-100 to-violet-50',
  psychic: 'from-pink-100 to-rose-50',
  bug: 'from-lime-100 to-green-50',
  rock: 'from-yellow-100 to-amber-50',
  ghost: 'from-violet-100 to-purple-50',
  dragon: 'from-indigo-100 to-violet-50',
  dark: 'from-neutral-200 to-neutral-100',
  steel: 'from-slate-200 to-slate-100',
  fairy: 'from-pink-100 to-rose-50',
};

export function getTypeStyle(type: string): string {
  return TYPE_STYLES[type] ?? 'bg-gradient-to-r from-slate-400 to-slate-500';
}

export function getTypeTint(types: string[]): string {
  const primary = types[0];
  return TYPE_TINTS[primary] ?? 'from-slate-100 to-white';
}
