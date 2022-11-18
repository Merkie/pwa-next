import create from "zustand";
import { persist } from "zustand/middleware";

enum AppMode {
  Home = "home",
  Edit = "edit",
  Dashboard = "dashboard",
}

interface ApplicationState {
  AppMode: string;
  setAppMode: (mode: AppMode) => void;
}

export const useStore = create(
  persist(
    (set, get) => ({
      AppMode: AppMode.Home,
      setAppMode: (mode: AppMode) => set({ AppMode: mode }),
    }),
    {
      name: "freespeech-storage",
      getStorage: () => localStorage,
    }
  )
);
