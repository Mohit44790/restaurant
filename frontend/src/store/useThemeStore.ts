import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Theme = "dark" | "light";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  loadThemeFromStorage: (storageKey: string, defaultTheme: Theme) => void;
  initializeTheme: () => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "light", // Default theme

      // Sets the theme and applies it to the root HTML element
      setTheme: (theme: Theme) => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        localStorage.setItem("vite-ui-theme", theme); // Ensure theme is saved in localStorage
        set({ theme });
      },

      // Loads the theme from storage (useful for SSR or manual loading)
      loadThemeFromStorage: (storageKey: string, defaultTheme: Theme) => {
        const storedTheme = (localStorage.getItem(storageKey) as Theme) || defaultTheme;
        set({ theme: storedTheme });
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(storedTheme); // Apply the stored theme to the HTML element
      },

      // Initializes the theme on first load by checking localStorage
      initializeTheme: () => {
        if (typeof window !== "undefined") {
          const storedTheme = (localStorage.getItem("vite-ui-theme") as Theme) || "light"; // Default to 'light' if no stored theme
          const root = window.document.documentElement;
          root.classList.remove("light", "dark");
          root.classList.add(storedTheme); // Apply the stored theme to the HTML element
          set({ theme: storedTheme });
        }
      },
    }),
    {
      name: "theme-store", // Name of the storage key
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
    }
  )
);
