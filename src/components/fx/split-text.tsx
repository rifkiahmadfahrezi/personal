"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useIntroReady } from "./intro";

const EASE = [0.16, 1, 0.3, 1] as const;

// Masked reveal: every word (or char) slides up from behind its own clip box.
export const SplitText = ({
   text,
   by = "word",
   className,
   delay = 0,
   stagger = 0.04,
   inView = false,
}: {
   text: string;
   by?: "word" | "char";
   className?: string;
   delay?: number;
   stagger?: number;
   inView?: boolean;
}) => {
   const ready = useIntroReady();
   const words = text.split(" ");
   let index = 0;

   const piece = (content: string, key: string) => {
      const i = index++;
      return (
         <span key={key} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
               className="inline-block will-change-transform"
               initial={{ y: "110%" }}
               {...(inView
                  ? { whileInView: { y: 0 }, viewport: { once: true, margin: "-10% 0px" } }
                  : { animate: ready ? { y: 0 } : undefined })}
               transition={{ duration: 1, ease: EASE, delay: delay + i * stagger }}
            >
               {content}
            </motion.span>
         </span>
      );
   };

   return (
      <span className={cn("inline", className)}>
         <span className="sr-only">{text}</span>
         <span aria-hidden>
            {words.map((word, w) => (
               <span key={w} className="inline-block whitespace-nowrap">
                  {by === "char"
                     ? word.split("").map((c, ci) => piece(c, `${w}-${ci}`))
                     : piece(word, `${w}`)}
                  {w < words.length - 1 && " "}
               </span>
            ))}
         </span>
      </span>
   );
};
