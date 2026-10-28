"use client";

import socials from "@/data/links.json";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Magnetic } from "@/components/fx/magnetic";
import { cn } from "@/lib/utils";
import { Mail, FileText, Github, Linkedin, ChevronDown } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
   Mail,
   FileText,
   Github,
   Linkedin,
};

// Pill with a fill that wipes up from the bottom on hover.
const pill = (variant: string) =>
   cn(
      "group/pill relative inline-flex h-10 items-center gap-2 overflow-hidden rounded-full border px-4 text-sm font-medium transition-colors duration-500 ease-out-expo outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
      "before:absolute before:inset-0 before:-z-10 before:translate-y-full before:rounded-full before:bg-signal before:transition-transform before:duration-500 before:ease-out-expo hover:before:translate-y-0 hover:text-signal-foreground hover:border-signal data-[state=open]:before:translate-y-0 data-[state=open]:text-signal-foreground",
      "isolate",
      variant === "default"
         ? "border-foreground bg-foreground text-background before:bg-background hover:text-foreground hover:border-foreground data-[state=open]:text-foreground"
         : "border-border text-foreground",
   );

export const SocialLinks = () => (
   <ul className="flex flex-wrap items-center gap-2">
      {socials.map(({ link, name, variant, icon, ...rest }) => {
         const Icon = icon ? iconMap[icon] : null;
         const options = "options" in rest ? rest.options : null;
         const external = link.startsWith("http");

         return (
            <li key={link}>
               <Magnetic strength={0.25}>
                  {options ? (
                     <DropdownMenu>
                        <DropdownMenuTrigger className={pill(variant)}>
                           {Icon && <Icon className="size-3.5" />}
                           {name}
                           <ChevronDown className="size-3.5 transition-transform group-data-[state=open]/pill:rotate-180" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                           {options.map((option) => (
                              <DropdownMenuItem key={option.link} asChild>
                                 <a target="_blank" rel="noopener noreferrer" href={option.link}>
                                    {option.name}
                                 </a>
                              </DropdownMenuItem>
                           ))}
                        </DropdownMenuContent>
                     </DropdownMenu>
                  ) : (
                     <a
                        className={pill(variant)}
                        href={link}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                     >
                        {Icon && <Icon className="size-3.5" />}
                        {name}
                     </a>
                  )}
               </Magnetic>
            </li>
         );
      })}
   </ul>
);
