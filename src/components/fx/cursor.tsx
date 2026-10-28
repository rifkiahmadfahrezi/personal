"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// Trailing dot that grows over interactive elements. Native cursor stays visible.
// Elements can set data-cursor="label" to show a word inside the ring.
export const Cursor = () => {
   const [hover, setHover] = useState(false);
   const [label, setLabel] = useState("");
   const x = useMotionValue(-100);
   const y = useMotionValue(-100);
   const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
   const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

   useEffect(() => {
      const move = (e: PointerEvent) => {
         x.set(e.clientX);
         y.set(e.clientY);
         const target = (e.target as Element).closest?.("a, button, [data-cursor]");
         setHover(!!target);
         setLabel(target?.getAttribute("data-cursor") ?? "");
      };
      window.addEventListener("pointermove", move, { passive: true });
      return () => window.removeEventListener("pointermove", move);
   }, [x, y]);

   return (
      <motion.div
         aria-hidden
         className="pointer-events-none fixed left-0 top-0 z-[70] hidden mix-blend-difference pointer-fine:block motion-reduce:hidden"
         style={{ x: sx, y: sy }}
      >
         <motion.div
            className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[10px] font-medium uppercase tracking-widest text-black"
            animate={{
               width: label ? 88 : hover ? 44 : 10,
               height: label ? 88 : hover ? 44 : 10,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
         >
            {label}
         </motion.div>
      </motion.div>
   );
};
