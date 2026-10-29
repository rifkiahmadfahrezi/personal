"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "lucide-react";
import { Button } from "./ui/button";

// Icons swap through the .dark class, so server and client markup match (no hydration mismatch).
export const ThemeSwitcher = () => {
   const { resolvedTheme, setTheme } = useTheme();

   return (
      <Button
         onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
         size="icon"
         variant="ghost"
         aria-label="Toggle theme"
         className="text-muted-foreground hover:text-foreground transition-colors"
      >
         <SunIcon className="hidden size-4 transition-transform duration-300 hover:rotate-45 dark:block" />
         <MoonIcon className="size-4 transition-transform duration-300 dark:hidden" />
      </Button>
   );
};
