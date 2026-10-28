"use client";

import { useRef } from "react";
import {
   motion,
   useAnimationFrame,
   useMotionValue,
   useReducedMotion,
   useScroll,
   useSpring,
   useTransform,
   useVelocity,
   wrap,
} from "motion/react";

// Infinite marquee whose speed and direction follow scroll velocity.
export const Marquee = ({
   children,
   baseVelocity = -2,
}: {
   children: React.ReactNode;
   baseVelocity?: number;
}) => {
   const reduce = useReducedMotion();
   const baseX = useMotionValue(0);
   const { scrollY } = useScroll();
   const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
   const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
   const x = useTransform(baseX, (v) => `${wrap(-50, -25, v)}%`);
   const direction = useRef(1);

   useAnimationFrame((_, delta) => {
      if (reduce) return;
      let move = direction.current * baseVelocity * (delta / 1000);
      const f = factor.get();
      if (f < 0) direction.current = -1;
      else if (f > 0) direction.current = 1;
      move += direction.current * move * f;
      baseX.set(baseX.get() + move);
   });

   return (
      <div className="overflow-hidden whitespace-nowrap" aria-hidden>
         <motion.div className="flex w-max" style={{ x }}>
            {[0, 1, 2, 3].map((i) => (
               <span key={i} className="block pr-[0.3em]">
                  {children}
               </span>
            ))}
         </motion.div>
      </div>
   );
};
