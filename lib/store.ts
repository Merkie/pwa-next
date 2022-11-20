import create from "zustand";
import { persist } from "zustand/middleware";

interface ApplicationState {
  CurrentProject: string;
  setCurrentProject: (id: string) => void;
}

export const useStore = create(
  persist(
    (set, get) => ({
      CurrentProject: "",
      setCurrentProject: (id: string) => set({ CurrentProject: id }),
    }),
    {
      name: "freespeech-storage",
      getStorage: () => localStorage,
    }
  )
);
