import projects from "@/data/projects.json";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Projects",
   description:
      "A collection of projects built by Rifki Ahmad Fahrezi — from open-source tools to client websites.",
};

const Projects = () => {
   return (
      <div className="space-y-6">
         <BlurFade className="space-y-1">
            <h1 className="text-lg font-semibold tracking-tight">Projects</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
               Everything I&apos;ve built — from side projects to client work.
            </p>
         </BlurFade>

         <ul className="grid grid-cols-1 gap-2">
            {projects.map(({ title, description, link, role }) => (
               <li key={link}>
                  <BlurFade inView>
                     <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/card block"
                     >
                        <Card className="p-4 gap-2 hover:border-foreground/20 transition-all duration-200">
                           <div className="flex items-start justify-between gap-2">
                              <CardTitle className="text-sm">{title}</CardTitle>
                              <ArrowRight className="size-3.5 text-muted-foreground shrink-0 mt-0.5 transition-transform duration-200 group-hover/card:translate-x-0.5" />
                           </div>
                           <CardDescription className="text-xs leading-relaxed">
                              {description}
                           </CardDescription>
                           <div className="flex items-center gap-1 flex-wrap mt-1">
                              {role.map((r) => (
                                 <Badge
                                    key={r}
                                    variant="secondary"
                                    className="text-[10px] font-normal px-1.5 py-0"
                                 >
                                    {r}
                                 </Badge>
                              ))}
                           </div>
                        </Card>
                     </a>
                  </BlurFade>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default Projects;