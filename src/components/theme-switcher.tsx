"use client"

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "lucide-react";
import { Button } from "./ui/button";

export const ThemeSwitcher = () => {
   const { theme, setTheme } = useTheme()

   return (
      <>
         <Button onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark")
         }} size="icon" variant={"ghost"}>
            {theme == "dark" ? (
               <SunIcon />
            ) : (
               <MoonIcon />
            )
            }
         </Button>
      </>
   )
};
