import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface User {
  id?: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  image?: string;
}

export interface UserActions {
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<User & UserActions>()(
  devtools(
    persist(
      (set) => ({
        id: undefined,
        name: "",
        username: "",
        email: "",
        bio: "",
        image: "",
        setUser: (user) => {
          set(user);
        },
        logout: () => {
          set({
            id: undefined,
            name: "",
            username: "",
            email: "",
            bio: "",
            image: "",
          });
        },
      }),
      {
        name: "user-storage",
      }
    )
  )
);
