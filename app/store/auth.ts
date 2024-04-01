import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
axios.defaults.withCredentials = true;

export interface User {
  id: string;
  isAdmin: boolean;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Credentials {
  email: string;
  password: string;
}

interface UserStore {
  user: User | null;
  login: (values: Credentials) => void;
  logout: () => void;
  error: string | null;
}

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      error: null,
      login: (values: Credentials) => {
        axios
          .post("http://localhost:8080/api/users/login", values)
          .then((response) => {
            set(() => ({ user: response.data, error: null }));
          })
          .catch((error) => set({ error: error.response.data.message }));
      },
      logout: () => {
        axios
          .get("http://localhost:8080/api/users/logout")
          .then(() => {
            localStorage.setItem("user", "");
            set(() => ({ user: null }));
          })
          .catch((error) => set({ error: error.response.data.message }));
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
      partialize: (state: UserStore) => ({ user: state.user }),
    }
  )
);
