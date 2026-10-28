import home from "@/data/home.json";
import { Marquee } from "@/components/fx/marquee";
import { ScrollWords } from "@/components/fx/scroll-words";

const SKILLS = ["React", "Next.js", "TypeScript", "Design Systems", "Real-time", "Figma"];

export const Statement = () => (
   <section aria-label="About" className="py-[clamp(4rem,10vw,8rem)]">
      <div className="border-y border-border py-6 text-[clamp(3rem,9vw,8rem)] font-semibold leading-none tracking-[-0.045em]">
         <Marquee>
            {SKILLS.map((s) => (
               <span key={s}>
                  {s}
                  <span className="mx-[0.3em] font-serif font-normal italic text-signal">✳</span>
               </span>
            ))}
         </Marquee>
      </div>

      <div className="gutter mt-[clamp(4rem,10vw,9rem)] grid gap-8 md:grid-cols-12">
         <p className="label md:col-span-3 md:pt-4">(About)</p>
         <ScrollWords
            text={home.statement}
            className="text-[clamp(1.75rem,3.6vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.03em] md:col-span-9"
         />
      </div>
   </section>
);
