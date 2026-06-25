export type PokemonTypeName =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

export interface PokemonSummary {
  id: number;
  name: string;
  spriteUrl: string;
  types: PokemonTypeName[];
}

export interface EvolutionOption {
  id: number;
  name: string;
  spriteUrl: string;
}

export interface PokemonDetail extends PokemonSummary {
  abilities: string[];
  evolutions: EvolutionOption[];
}

export interface Favorite {
  id: number;
  name: string;
}
