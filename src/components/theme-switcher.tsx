"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "lucide-react";
import { Button } from "./ui/button";

export const ThemeSwitcher = () => {
   const { theme, setTheme } = useTheme();

   return (
      <Button
         onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
         size="icon"
         variant="ghost"
         aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
         className="text-muted-foreground hover:text-foreground transition-colors"
      >
         {theme === "dark" ? (
            <SunIcon className="size-4 transition-transform duration-300 rotate-0 hover:rotate-45" />
         ) : (
            <MoonIcon className="size-4 transition-transform duration-300" />
         )}
      </Button>
   );
};
