"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { setIntroReady } from "./intro";

const IN_OUT = [0.76, 0, 0.24, 1] as const;
const LABELS: Record<string, string> = { "/": "Home", "/project": "Projects" };

// Curtain between routes: cover, swap the page behind it, then lift.
// Intercepts same-origin link clicks in the capture phase, before next/link handles them.
export const PageTransition = () => {
   const router = useRouter();
   const pathname = usePathname();
   const [phase, setPhase] = useState<"idle" | "cover" | "reveal">("idle");
   const [label, setLabel] = useState("");
   const [seenPath, setSeenPath] = useState(pathname);
   const pending = useRef<string | null>(null);

   // New route rendered behind the curtain: lift it.
   if (pathname !== seenPath) {
      setSeenPath(pathname);
      if (phase === "cover") setPhase("reveal");
   }

   useEffect(() => {
      const onClick = (e: MouseEvent) => {
         if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
         if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
         const a = (e.target as Element).closest?.("a");
         if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
         const url = new URL(a.href, location.href);
         if (url.origin !== location.origin || url.pathname === location.pathname) return;
         e.preventDefault();
         pending.current = url.pathname + url.search + url.hash;
         setLabel(LABELS[url.pathname] ?? "");
         setIntroReady(false);
         setPhase("cover");
      };
      document.addEventListener("click", onClick, true);
      return () => document.removeEventListener("click", onClick, true);
   }, []);

   return (
      <AnimatePresence>
         {phase !== "idle" && (
            <motion.div
               key="curtain"
               aria-hidden
               className="gutter fixed inset-0 z-[80] flex items-end bg-foreground pb-8 text-background"
               initial={{ clipPath: "inset(100% 0 0 0)" }}
               animate={{ clipPath: phase === "cover" ? "inset(0% 0 0 0)" : "inset(0 0 100% 0)" }}
               transition={{ duration: 0.75, ease: IN_OUT }}
               onAnimationComplete={() => {
                  if (phase === "cover" && pending.current) {
                     router.push(pending.current);
                     pending.current = null;
                  } else if (phase === "reveal") {
                     setPhase("idle");
                  }
               }}
               onAnimationStart={() => phase === "reveal" && setIntroReady(true)}
            >
               <motion.span
                  className="font-serif text-[clamp(3rem,10vw,9rem)] italic leading-none tracking-[-0.02em]"
                  initial={{ y: 40, opacity: 0 }}
                  animate={phase === "cover" ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }}
                  transition={{ duration: 0.6, ease: IN_OUT, delay: phase === "cover" ? 0.25 : 0 }}
               >
                  {label}
               </motion.span>
            </motion.div>
         )}
      </AnimatePresence>
   );
};
