"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { siteConfig } from "@/config/site";
import home from "@/data/home.json";
import { SplitText } from "@/components/fx/split-text";
import { LocalTime } from "@/components/fx/local-time";
import { useIntroReady } from "@/components/fx/intro";
import { SocialLinks } from "./social-links";

const EASE = [0.16, 1, 0.3, 1] as const;

export const Hero = () => {
   const ref = useRef<HTMLElement>(null);
   const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
   const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
   const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
   const ready = useIntroReady();

   // Spotlight follows the pointer through a CSS variable, no re-render.
   const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
      e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
   };

   const [first, ...rest] = siteConfig.title.split(" ");
   const last = rest.pop() ?? "";
   const middle = rest.join(" ");

   return (
      <section
         ref={ref}
         aria-label="Intro"
         onPointerMove={onPointerMove}
         className="gutter relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-24 pb-8 [--mx:50%] [--my:40%]"
      >
         <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black_55%,transparent)] [background:radial-gradient(600px_circle_at_var(--mx)_var(--my),color-mix(in_oklch,var(--signal)_18%,transparent),transparent_60%)]"
         />

         <motion.div
            className="relative grid grid-cols-2 gap-4 md:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : undefined}
            transition={{ duration: 0.8, delay: 0.9 }}
         >
            <p className="label">Front-end Developer</p>
            <p className="label hidden md:block">Bandung, ID</p>
            <p className="label text-right">
               <LocalTime />
            </p>
         </motion.div>

         <motion.div style={{ y: nameY, opacity: fade }} className="relative">
            <h1 className="font-semibold leading-[0.88] tracking-[-0.045em] text-[18vw] sm:text-[clamp(3.5rem,14.5vw,15rem)]">
               <span className="block">
                  <SplitText text={first} by="char" delay={0.1} stagger={0.035} />
               </span>
               <span className="block">
                  <span className="font-serif font-normal italic tracking-[-0.02em] text-signal">
                     <SplitText text={middle} by="char" delay={0.25} stagger={0.035} />
                  </span>{" "}
                  <SplitText text={last} by="char" delay={0.4} stagger={0.035} />
               </span>
            </h1>
         </motion.div>

         <motion.div
            className="relative grid items-end gap-8 lg:grid-cols-12 lg:gap-x-4"
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, ease: EASE, delay: 0.8 }}
         >
            <div className="flex items-center gap-4 lg:col-span-4">
               <Image
                  src="/me.webp"
                  alt={`Photo of ${siteConfig.title}`}
                  width={64}
                  height={64}
                  priority
                  className="size-14 shrink-0 rounded-full object-cover grayscale transition duration-500 hover:grayscale-0"
               />
               <div
                  className="max-w-md text-[clamp(1rem,0.4vw+0.85rem,1.2rem)] leading-snug text-muted-foreground [&_strong]:font-medium [&_strong]:text-foreground"
                  dangerouslySetInnerHTML={{ __html: home.content }}
               />
            </div>
            <div className="lg:col-span-7">
               <SocialLinks />
            </div>
            <a
               href="#work"
               aria-label="Scroll to selected work"
               className="group hidden size-14 items-center justify-center justify-self-end rounded-full border border-border transition-colors duration-300 hover:border-signal hover:bg-signal hover:text-signal-foreground lg:col-span-1 lg:flex"
            >
               <ArrowDown className="size-5 transition-transform duration-500 ease-out-expo group-hover:translate-y-1" />
            </a>
         </motion.div>
      </section>
   );
};
