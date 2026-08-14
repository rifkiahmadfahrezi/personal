"use client";
import { useRef } from "react";
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

// jarak minimum (px) sebelum dianggap "ditarik", bukan sekadar diklik
const DRAG_THRESHOLD = 8;

export const Navbar = () => {
   const pathname = usePathname();
   const { theme, setTheme } = useTheme();
   const isDark = theme === "dark";

   // lacak pointer secara manual: onPull dari pullcord bisa terpicu
   // dari drag ASLI maupun dari klik/Enter (fallback aksesibilitas bawaan lib).
   // Kita hanya mau ganti tema kalau ada gerakan drag yang nyata.
   const startPos = useRef<{ x: number; y: number } | null>(null);
   const draggedRef = useRef(false);

   const handlePointerDown = (e: React.PointerEvent) => {
      startPos.current = { x: e.clientX, y: e.clientY };
      draggedRef.current = false;
   };

   const handlePointerMove = (e: React.PointerEvent) => {
      if (!startPos.current) return;
      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;
      if (Math.hypot(dx, dy) > DRAG_THRESHOLD) {
         draggedRef.current = true;
      }
   };

   const handlePointerUp = () => {
      startPos.current = null;
   };

   const handlePull = () => {
      // hanya ganti tema kalau memang habis "ditarik" (drag),
      // bukan dari klik biasa / keyboard Enter
      if (draggedRef.current) {
         setTheme(isDark ? "light" : "dark");
      }
      draggedRef.current = false;
   };

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
         <div
            className="hidden sm:block"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
         >
            <PullCord
               onPull={handlePull}
               pulled={!isDark}
               ariaLabel="Toggle theme"
            />
         </div>
      </BlurFade>
   );
};