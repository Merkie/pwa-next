import create from "zustand";
import { persist } from "zustand/middleware";

enum AppMode {
  Normal = "normal",
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
      AppMode: AppMode.Normal,
      setAppMode: (mode: AppMode) => set({ AppMode: mode }),
    }),
    {
      name: "freespeech-storage",
      getStorage: () => localStorage,
    }
  )
);
