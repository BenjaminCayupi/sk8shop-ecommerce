"use client";

import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface Props {
  size?: "small" | "large";
  title?: string;
}

export default function ModeToggle({ size = "large", title }: Props) {
  const { setTheme } = useTheme();

  return (
    <div>
      <div className="flex flex-row">
        <Sun
          onClick={() => setTheme("light")}
          className={clsx(
            "text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-400 hidden dark:block transition-all cursor-pointer",
            { "h-5 w-5": size === "small", "h-6 w-6": size === "large" }
          )}
          aria-label="Cambiar tema"
        />
        {title && (
          <p
            onClick={() => setTheme("light")}
            className="pl-[8px] text-gray-600 hover:text-gray-900 cursor-pointer hidden dark:block dark:text-white dark:hover:text-gray-400"
          >
            {title}
          </p>
        )}
      </div>

      <div className="flex flex-row">
        <Moon
          onClick={() => setTheme("dark")}
          className={clsx(
            "text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-400 dark:hidden transition-all cursor-pointer",
            { "h-5 w-5": size === "small", "h-6 w-6": size === "large" }
          )}
          aria-label="Cambiar tema"
        />

        {title && (
          <p
            onClick={() => setTheme("dark")}
            className="pl-[8px] text-gray-600 hover:text-gray-900 cursor-pointer dark:hidden"
          >
            {title}
          </p>
        )}
      </div>
    </div>
  );
}
