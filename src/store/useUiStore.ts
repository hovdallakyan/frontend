import { create } from "zustand";

interface UiState {
  search: string;
  favoritesOnly: boolean;
  setSearch: (search: string) => void;
  setFavoritesOnly: (favoritesOnly: boolean) => void;
  toggleFavoritesOnly: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  search: "",
  favoritesOnly: false,
  setSearch: (search) => set({ search }),
  setFavoritesOnly: (favoritesOnly) => set({ favoritesOnly }),
  toggleFavoritesOnly: () =>
    set((state) => ({ favoritesOnly: !state.favoritesOnly })),
}));
