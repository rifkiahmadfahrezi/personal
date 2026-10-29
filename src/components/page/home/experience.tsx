"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Code, Database, GitBranch, Layers, PenTool } from "lucide-react";
import experience from "@/data/experience.json";
import { SplitText } from "@/components/fx/split-text";

const EASE = [0.16, 1, 0.3, 1] as const;
const icons: Record<string, React.ElementType> = { Code, Database, GitBranch, Layers, PenTool };
// Bento spans, in the order skills appear in the data.
const spans = ["md:col-span-2", "md:col-span-4", "md:col-span-6", "md:col-span-3", "md:col-span-3"];

export const Experience = () => {
   const listRef = useRef<HTMLOListElement>(null);
   const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.7", "end 0.6"] });
   const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

   return (
      <section id="experience" aria-labelledby="experience-title" className="gutter scroll-mt-20 py-[clamp(5rem,12vw,10rem)]">
         <div className="mb-10 flex items-end justify-between gap-6 md:mb-16">
            <h2 id="experience-title" className="text-[clamp(2.5rem,7vw,7rem)] font-semibold leading-none tracking-[-0.045em]">
               <SplitText text="Experience" inView />
            </h2>
            <span className="label pb-3">({String(experience.jobs.length).padStart(2, "0")})</span>
         </div>

         <ol ref={listRef} className="relative border-t border-border">
            {/* Timeline: faint rail plus a fill that grows with scroll. */}
            <span aria-hidden className="absolute bottom-0 left-0 top-0 hidden w-px bg-border lg:block" />
            <motion.span
               aria-hidden
               style={{ scaleY: progress }}
               className="absolute bottom-0 left-0 top-0 hidden w-px origin-top bg-foreground lg:block"
            />

            {experience.jobs.map(({ role, company, period, location, highlights, stack }, i) => {
               const current = period.includes("Present");
               return (
                  <li key={company} className="relative grid gap-8 border-b border-border py-12 lg:grid-cols-12 lg:py-16 lg:pl-10">
                     <span aria-hidden className="absolute -left-[4.5px] top-[4.25rem] hidden size-2.5 rounded-full border border-foreground bg-background lg:block" />

                     <div className="lg:col-span-4">
                        <div className="space-y-4 lg:sticky lg:top-28">
                           <p className="label tabular-nums">
                              {String(i + 1).padStart(2, "0")} / {period}
                           </p>
                           <p className="font-serif text-[clamp(2rem,3.5vw,3.25rem)] italic leading-none tracking-[-0.02em]">
                              {company}
                           </p>
                           <div className="flex flex-wrap items-center gap-3">
                              {current && (
                                 <span className="label inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 !text-foreground">
                                    <span className="relative flex size-1.5">
                                       <span className="absolute inset-0 animate-ping rounded-full bg-foreground opacity-60 motion-reduce:animate-none" />
                                       <span className="relative size-1.5 rounded-full bg-foreground" />
                                    </span>
                                    Current
                                 </span>
                              )}
                              <span className="label">{location}</span>
                           </div>
                        </div>
                     </div>

                     <div className="lg:col-span-8">
                        <h3 className="text-[clamp(1.5rem,2.6vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]">{role}</h3>


                        <ul className="mt-8 space-y-4">
                           {highlights.map((h, hi) => (
                              <motion.li
                                 key={h}
                                 initial={{ opacity: 0, y: 16 }}
                                 whileInView={{ opacity: 1, y: 0 }}
                                 viewport={{ once: true, margin: "-10% 0px" }}
                                 transition={{ duration: 0.7, ease: EASE, delay: hi * 0.07 }}
                                 className="grid grid-cols-[2rem_1fr] gap-2 border-t border-border pt-4 text-[0.975rem] leading-relaxed text-muted-foreground"
                              >
                                 <span className="label pt-1 tabular-nums">{String(hi + 1).padStart(2, "0")}</span>
                                 {h}
                              </motion.li>
                           ))}
                        </ul>

                        <ul aria-label="Stack" className="mt-8 flex flex-wrap gap-2">
                           {stack.map((s) => (
                              <li key={s} className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground transition-colors duration-300 hover:border-foreground hover:text-foreground">
                                 {s}
                              </li>
                           ))}
                        </ul>
                     </div>
                  </li>
               );
            })}
         </ol>

         <div className="mt-[clamp(5rem,10vw,9rem)]">
            <div className="mb-8 flex items-end justify-between gap-6 md:mb-12">
               <h3 className="text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-none tracking-[-0.045em]">
                  <SplitText text="Toolkit" inView />
               </h3>
               <span className="label pb-2">({String(experience.skills.reduce((n, s) => n + s.items.length, 0))} tools)</span>
            </div>

            <ul className="grid gap-3 md:grid-cols-6">
               {experience.skills.map(({ group, items, icon }, i) => {
                  const Icon = icons[icon];
                  return (
                     <motion.li
                        key={group}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.8, ease: EASE, delay: (i % 3) * 0.08 }}
                        onPointerMove={(e) => {
                           const r = e.currentTarget.getBoundingClientRect();
                           e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
                           e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
                        }}
                        className={`group relative isolate overflow-hidden rounded-xl border border-border bg-card/40 p-6 backdrop-blur-sm transition-colors duration-500 hover:border-foreground/25 ${spans[i]}`}
                     >
                        {/* Spotlight that follows the pointer inside the card. */}
                        <span
                           aria-hidden
                           className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(320px_circle_at_var(--x)_var(--y),color-mix(in_oklch,var(--foreground)_9%,transparent),transparent_70%)]"
                        />
                        <div className="mb-8 flex items-center justify-between">
                           <span className="flex size-10 items-center justify-center rounded-lg border border-border transition-colors duration-500 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                              <Icon className="size-4" />
                           </span>
                           <span className="label tabular-nums">{String(items.length).padStart(2, "0")}</span>
                        </div>
                        <p className="label mb-3">{group}</p>
                        <ul className="flex flex-wrap gap-x-4 gap-y-1">
                           {items.map((item) => (
                              <li key={item} className="text-[clamp(1.125rem,1.6vw,1.5rem)] font-medium tracking-[-0.02em]">
                                 {item}
                              </li>
                           ))}
                        </ul>
                     </motion.li>
                  );
               })}
            </ul>
         </div>
      </section>
   );
};
