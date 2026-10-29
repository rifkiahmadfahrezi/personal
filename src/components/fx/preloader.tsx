"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useLenis } from "lenis/react";
import { setIntroReady } from "./intro";

const IN_OUT = [0.76, 0, 0.24, 1] as const;

// Visual + exit. Repeat visits in a session and reduced motion are hidden before paint.
export const Preloader = () => {
   const [exiting, setExiting] = useState(false);
   const [gone, setGone] = useState(false);
   const lenis = useLenis();
   // True only when the loader is actually on screen this visit (not skipped).
   const running = useRef(false);

   useEffect(() => {
      const w = window as Window & { __rfDone?: number };
      if (document.documentElement.classList.contains("loaded") || matchMedia("(prefers-reduced-motion: reduce)").matches) {
         setIntroReady(true);
         return;
      }
      running.current = true;
      scrollTo(0, 0);
      let timer: ReturnType<typeof setTimeout>;
      // Let the CSS counter finish its tween to 100 before lifting.
      const exit = () => {
         timer = setTimeout(() => {
            // Browsers restore the old scroll position late (after load); reset behind the panel.
            scrollTo(0, 0);
            setExiting(true);
            setIntroReady(true);
            document.documentElement.classList.remove("rf-loading");
            history.scrollRestoration = "auto";
            try {
               sessionStorage.setItem("rf-loaded", "1");
            } catch {}
         }, 500);
      };
      if (w.__rfDone) exit();
      else addEventListener("rf:loaded", exit, { once: true });
      return () => {
         clearTimeout(timer);
         removeEventListener("rf:loaded", exit);
      };
   }, []);

   // Lock smooth scroll only while the loader is showing; a skipped loader must never stop Lenis.
   useEffect(() => {
      if (!lenis) return;
      if (running.current && !exiting) {
         lenis.scrollTo(0, { immediate: true, force: true });
         lenis.stop();
      }
      else {
         if (running.current) lenis.scrollTo(0, { immediate: true, force: true });
         lenis.start();
      }
   }, [lenis, exiting]);

   if (gone) return null;

   return (
      <motion.div
         data-loader
         role="status"
         aria-label="Loading"
         className="gutter fixed inset-0 z-[90] flex flex-col justify-between bg-background py-6"
         initial={false}
         animate={exiting ? { y: "-100%" } : { y: 0 }}
         transition={{ duration: 0.9, ease: IN_OUT, delay: 0.25 }}
         onAnimationComplete={() => exiting && setGone(true)}
      >
         <motion.div
            className="flex items-center justify-between"
            animate={exiting ? { opacity: 0, y: -16 } : {}}
            transition={{ duration: 0.4 }}
         >
            <span className="text-2xl font-semibold tracking-[-0.04em]">R.</span>
            <span className="label">Rifki Ahmad Fahrezi — Portfolio</span>
         </motion.div>

         <div className="flex items-end justify-between gap-6 overflow-hidden">
            <motion.p
               className="font-semibold leading-[0.8] tracking-[-0.06em] tabular-nums text-[clamp(6rem,24vw,22rem)]"
               animate={exiting ? { y: "-40%", opacity: 0 } : {}}
               transition={{ duration: 0.6, ease: IN_OUT }}
            >
               <span data-loader-count aria-hidden />
               <span className="font-serif text-[0.4em] font-normal italic tracking-normal">%</span>
            </motion.p>
            <motion.p className="label hidden pb-4 text-right sm:block" animate={exiting ? { opacity: 0 } : {}}>
               Front-end Developer
               <br />
               Bandung, ID
            </motion.p>
         </div>

         <span aria-hidden data-loader-bar className="absolute inset-x-0 bottom-0 h-px origin-left bg-foreground" />
      </motion.div>
   );
};
