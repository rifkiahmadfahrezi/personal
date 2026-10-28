import type { Metadata } from "next";
import { WorkList } from "@/components/page/home";
import { SplitText } from "@/components/fx/split-text";

export const metadata: Metadata = {
   title: "Projects",
   description:
      "A collection of projects built by Rifki Ahmad Fahrezi — from open-source tools to client websites.",
};

const Projects = () => {
   return (
      <section aria-labelledby="projects-title" className="gutter pt-36 pb-[clamp(5rem,12vw,10rem)]">
         <div className="mb-12 grid gap-6 md:mb-20 md:grid-cols-12 md:items-end">
            <h1 id="projects-title" className="text-[clamp(3rem,11vw,11rem)] font-semibold leading-[0.88] tracking-[-0.045em] md:col-span-8">
               <SplitText text="All" by="char" />{" "}
               <span className="font-serif font-normal italic tracking-[-0.02em] text-signal">
                  <SplitText text="projects" by="char" delay={0.1} stagger={0.03} />
               </span>
            </h1>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground md:col-span-4 md:justify-self-end">
               Everything I&apos;ve built — from side projects to client work.
            </p>
         </div>
         <WorkList />
      </section>
   );
};

export default Projects;
