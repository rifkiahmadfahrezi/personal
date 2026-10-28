"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menus } from "./menu";
import { ThemeSwitcher } from "../theme-switcher";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { PullCord } from "pullcord";
import "pullcord/pullcord.css";

// jarak minimum (px) sebelum dianggap "ditarik", bukan sekadar diklik
const DRAG_THRESHOLD = 8;

export const Navbar = () => {
   const pathname = usePathname();
   const { theme, setTheme } = useTheme();
   const isDark = theme === "dark";

   // Fade the scrim in over the first 80px of scroll, driven by a motion value (no re-render).
   const { scrollY } = useScroll();
   const scrimOpacity = useTransform(scrollY, [0, 80], [0, 1]);

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
      <>
         {/* Scrim under the header: solid at the top, fading out with a progressive blur,
             so content looks like it slides underneath. Kept separate from the header
             because the header uses mix-blend-difference. */}
         <motion.div
            aria-hidden
            style={{ opacity: scrimOpacity }}
            className="pointer-events-none fixed inset-x-0 top-0 z-40 h-20 bg-linear-to-b from-background via-background/75 to-transparent"
         >
            <div className="absolute inset-0 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_45%,transparent)]" />
         </motion.div>
         <header className="gutter pointer-events-none fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between text-white mix-blend-difference sm:justify-start sm:gap-[clamp(2rem,8vw,8rem)]">
            <Link
               href="/"
               aria-label="Home"
               className="pointer-events-auto text-2xl font-semibold leading-none tracking-[-0.04em] transition-transform duration-500 ease-out-expo hover:-rotate-6 hover:scale-110"
            >
               R.
            </Link>
            <nav aria-label="Main" className="pointer-events-auto flex items-center gap-1 sm:gap-6">
               <ul className="flex items-center gap-3.5 sm:gap-6">
                  {menus.map((menu) => (
                     <li key={menu.link} className={menu.label === "Writing" ? "max-[400px]:hidden" : undefined}>
                        <Link
                           href={menu.link}
                           className={cn(
                              "roll label !text-white/70 hover:!text-white",
                              pathname === menu.link && "!text-white"
                           )}
                        >
                           <span>{menu.label}</span>
                           <span aria-hidden>{menu.label}</span>
                        </Link>
                     </li>
                  ))}
               </ul>
               <div className="sm:hidden [&_button]:text-white">
                  <ThemeSwitcher />
               </div>
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
      </>
   );
};
