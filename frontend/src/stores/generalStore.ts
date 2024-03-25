import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface GeneralState {
  isEditProfileOpen: boolean;
  selectedPosts: null;
  ids: null;
  posts: null;
}

export interface GeneralActions {
  setIsEditProfileOpen: () => void;
}

export const useGeneralStore = create<GeneralState & GeneralActions>()(
  devtools(
    persist(
      (set) => ({
        isLoginOpen: false,
        isEditProfileOpen: false,
        selectedPosts: null,
        ids: null,
        posts: null,

        setIsEditProfileOpen: () => {
          return set((state) => ({
            isEditProfileOpen: !state.isEditProfileOpen,
          }));
        },
      }),
      {
        name: "general-store",
      }
    )
  )
);
