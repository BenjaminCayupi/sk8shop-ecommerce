"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <>
      <Sun
        onClick={() => setTheme("light")}
        className="h-6 w-6 text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-400 hidden dark:block transition-all cursor-pointer"
        aria-label="Carrito de compras"
      />
      <Moon
        onClick={() => setTheme("dark")}
        className="h-6 w-6 text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-400 dark:hidden transition-all cursor-pointer"
        aria-label="Carrito de compras"
      />
    </>
  );
}
