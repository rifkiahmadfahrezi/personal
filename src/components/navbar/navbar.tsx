"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menus } from "./menu";
import { ThemeSwitcher } from "../theme-switcher";
import { cn } from "@/lib/utils";
import { BlurFade } from "../magicui/blur-fade";
import { useTheme } from "next-themes";
import { PullCord } from "pullcord";
import "pullcord/pullcord.css";

export const Navbar = () => {
   const pathname = usePathname();
   const { theme, setTheme } = useTheme();
   const isDark = theme === "dark";

   return (
      <BlurFade direction="down" duration={0.5} className="sticky top-0 z-50">
         {/* Mobile-only navbar */}
         <header className="sm:hidden bg-background/80 backdrop-blur-2xl border-b border-border/50 h-12 flex items-center justify-between sticky top-0 z-50">
            <nav className="flex items-center justify-between flex-grow max-w-2xl mx-auto px-5">
               <Link
                  href="/"
                  className="text-sm font-semibold tracking-tight text-foreground hover:text-muted-foreground transition-colors"
               >
                  R.
               </Link>

               <ul className="flex items-center gap-0.5">
                  {menus.map((menu) => (
                     <li key={menu.link}>
                        <Button
                           size="sm"
                           variant="ghost"
                           asChild
                           className={cn(
                              "text-muted-foreground hover:text-foreground transition-colors",
                              pathname === menu.link && "text-foreground"
                           )}
                        >
                           <Link href={menu.link}>{menu.label}</Link>
                        </Button>
                     </li>
                  ))}
                  <li>
                     <ThemeSwitcher />
                  </li>
               </ul>
            </nav>
         </header>

         {/* Desktop: PullCord fixed to top of viewport */}
         <div className="hidden sm:block">
            <PullCord
               onPull={() => setTheme(isDark ? "light" : "dark")}
               pulled={!isDark}
               ariaLabel="Toggle theme"
            />
         </div>
      </BlurFade>
   );
};
