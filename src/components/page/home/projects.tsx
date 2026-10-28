"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import projects from "@/data/projects.json";
import { SplitText } from "@/components/fx/split-text";
import { ImagePopupButton } from "./image-popup-button";

type Project = (typeof projects)[number];

export const WorkList = ({ items = projects }: { items?: Project[] }) => {
   const [active, setActive] = useState<number | null>(null);
   const x = useMotionValue(0);
   const y = useMotionValue(0);
   const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
   const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });
   const current = active === null ? null : items[active];

   return (
      <div
         className="relative"
         onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            x.set(e.clientX - r.left);
            y.set(e.clientY - r.top);
         }}
         onPointerLeave={() => setActive(null)}
      >
         <ul className="group/list border-t border-border">
            {items.map(({ title, description, link, image, role }, i) => (
               <li
                  key={link}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                  className="group/item relative grid gap-4 border-b border-border py-8 transition-opacity duration-500 lg:grid-cols-12 lg:items-center lg:py-10 lg:group-hover/list:opacity-35 lg:hover:!opacity-100"
               >
                  <span className="label lg:col-span-1">{String(i + 1).padStart(2, "0")}</span>

                  <div className="lg:col-span-6">
                     <h3 className="text-[clamp(2rem,5.5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.04em] transition-transform duration-700 ease-out-expo lg:group-hover/item:translate-x-4">
                        <a
                           href={link}
                           target="_blank"
                           rel="noopener noreferrer"
                           data-cursor="View"
                           className="outline-none after:absolute after:inset-0 focus-visible:underline"
                        >
                           {title}
                        </a>
                     </h3>
                     <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>
                  </div>

                  {image && (
                     <Image
                        src={image.thumbnail}
                        alt=""
                        width={1200}
                        height={750}
                        unoptimized
                        className="aspect-[16/10] w-full rounded-md object-cover object-top md:max-w-lg lg:hidden"
                     />
                  )}

                  <ul className="flex flex-wrap gap-x-3 gap-y-1 lg:col-span-3 lg:flex-col">
                     {role.map((r) => (
                        <li key={r} className="label">
                           {r}
                        </li>
                     ))}
                  </ul>

                  <div className={`relative z-10 items-center gap-3 lg:col-span-2 lg:flex lg:justify-end ${image ? "flex" : "hidden"}`}>
                     {image && (
                        <ImagePopupButton image={image.full} title={title} link={link} alt={`Full design of ${title}`} />
                     )}
                     <ArrowUpRight className="pointer-events-none ml-auto size-6 shrink-0 text-muted-foreground transition-all duration-500 ease-out-expo lg:ml-0 group-hover/item:rotate-45 group-hover/item:text-signal" />
                  </div>
               </li>
            ))}
         </ul>

         {/* Floating preview that trails the pointer (desktop only). */}
         <motion.div
            aria-hidden
            style={{ x: sx, y: sy }}
            className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
         >
            <AnimatePresence>
               {current && (
                  <motion.div
                     key="preview"
                     initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
                     animate={{ opacity: 1, scale: 1, rotate: 0 }}
                     exit={{ opacity: 0, scale: 0.6, rotate: 6 }}
                     transition={{ type: "spring", stiffness: 300, damping: 26 }}
                     className="-translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg shadow-2xl shadow-black/30"
                  >
                     <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                           key={current.link}
                           initial={{ y: "100%" }}
                           animate={{ y: 0 }}
                           exit={{ y: "-100%" }}
                           transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                           className="h-[15rem] w-[24rem]"
                        >
                           {current.image ? (
                              <Image
                                 src={current.image.thumbnail}
                                 alt=""
                                 width={1200}
                                 height={750}
                                 unoptimized
                                 className="size-full object-cover object-top"
                              />
                           ) : (
                              <div className="flex size-full items-center justify-center bg-signal font-serif text-5xl italic text-signal-foreground">
                                 {current.title}
                              </div>
                           )}
                        </motion.div>
                     </AnimatePresence>
                  </motion.div>
               )}
            </AnimatePresence>
         </motion.div>
      </div>
   );
};

export const Projects = () => (
   <section id="work" aria-labelledby="work-title" className="gutter scroll-mt-20 py-[clamp(5rem,12vw,10rem)]">
      <div className="mb-10 flex items-end justify-between gap-6 md:mb-16">
         <h2 id="work-title" className="text-[clamp(2.5rem,7vw,7rem)] font-semibold leading-none tracking-[-0.045em]">
            <SplitText text="Selected" inView />{" "}
            <span className="font-serif font-normal italic tracking-[-0.02em]">
               <SplitText text="work" inView delay={0.1} />
            </span>
         </h2>
         <span className="label pb-3">({String(projects.length).padStart(2, "0")})</span>
      </div>
      <WorkList />
   </section>
);
