import { create } from "zustand";

export const useFavoritesStore = create((set, get, store) => ({
    favorites: [],

    addFavorite: (jobId) => set((state) => (
        {
            favorites: state.favorites.includes(jobId)
                ? state.favorites
                : [...state.favorites, jobId]
        }
    )),

    removeFavorite: (jobId) => set((state) => (
        {
            favorites: [...state.favorites].filter(job => job !== jobId)
        }
    )),

    clearFavorites: () => set(store.getInitialState()),

    isFavorite: (jobId) => get().favorites.includes(jobId),

    toggleFavorite: (jobId) => {
        const { addFavorite, removeFavorite, isFavorite } = get()

        const isFav = isFavorite(jobId)

        isFav ? removeFavorite(jobId) : addFavorite(jobId)
    },

    count: () => get().favorites.length,
}))