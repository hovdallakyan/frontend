import { create } from "zustand";

interface UiState {
  search: string;
  favoritesOnly: boolean;
  setSearch: (search: string) => void;
  toggleFavoritesOnly: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  search: "",
  favoritesOnly: false,
  setSearch: (search) => set({ search }),
  toggleFavoritesOnly: () =>
    set((state) => ({ favoritesOnly: !state.favoritesOnly })),
}));
