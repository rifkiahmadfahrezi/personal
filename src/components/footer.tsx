import { siteConfig } from "@/config/site";
import socials from "@/data/links.json";
import { Magnetic } from "./fx/magnetic";
import { LocalTime } from "./fx/local-time";
import { SplitText } from "./fx/split-text";

export const Footer = () => {
   const external = socials.filter((s) => s.link.startsWith("http") && !("options" in s));

   return (
      <footer id="contact" className="gutter relative overflow-hidden border-t border-border pt-[clamp(5rem,12vw,10rem)] pb-8">
         <p className="label mb-6">(Have an idea?)</p>

         <a
            href={`mailto:${siteConfig.links.email}`}
            data-cursor="Email"
            className="group block w-fit outline-none"
         >
            <span className="block text-[18vw] sm:text-[clamp(3.5rem,15vw,15rem)] font-semibold leading-[0.85] tracking-[-0.05em] transition-colors duration-500 group-hover:text-signal group-focus-visible:text-signal">
               <SplitText text="Let's" inView />{" "}
               <span className="font-serif font-normal italic tracking-[-0.02em]">
                  <SplitText text="talk" inView delay={0.1} />
               </span>
            </span>
            <span className="mt-4 block h-px origin-left scale-x-0 bg-signal transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
         </a>

         <div className="mt-8 flex flex-wrap items-center gap-6">
            <Magnetic>
               <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="inline-flex h-12 items-center rounded-full border border-foreground bg-foreground px-6 text-sm font-medium text-background transition-colors duration-300 hover:bg-transparent hover:text-foreground"
               >
                  {siteConfig.links.email}
               </a>
            </Magnetic>
         </div>

         <div className="mt-[clamp(4rem,10vw,8rem)] grid grid-cols-2 gap-6 border-t border-border pt-6 md:grid-cols-4">
            <div className="space-y-2">
               <p className="label">Local time</p>
               <p className="text-sm">
                  <LocalTime />
               </p>
            </div>
            <div className="space-y-2">
               <p className="label">Socials</p>
               <ul className="space-y-1 text-sm">
                  {external.map(({ name, link }) => (
                     <li key={link}>
                        <a href={link} target="_blank" rel="noopener noreferrer" className="roll">
                           <span>{name}</span>
                           <span aria-hidden className="text-signal">
                              {name}
                           </span>
                        </a>
                     </li>
                  ))}
               </ul>
            </div>
            <p className="label self-end">© {new Date().getFullYear()} {siteConfig.title}</p>
            <a href="#" className="roll label self-end justify-self-end !text-foreground">
               <span>Back to top ↑</span>
               <span aria-hidden className="text-signal">
                  Back to top ↑
               </span>
            </a>
         </div>
      </footer>
   );
};
