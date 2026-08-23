import projects from "@/data/projects.json";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ImagePopupButton } from "./image-popup-button";

export const Projects = () => {
   return (
      <BlurFade className="space-y-3">
         <div className="space-y-0.5">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
               Selected Work
            </p>
         </div>

         <ul className="grid grid-cols-1 gap-3">
            {projects.slice(0, 4).map(({ title, description, link, image, role }) => (
               <li key={link} className="h-full">
                  <BlurFade inView className="h-full">
                     <Card className="p-3 gap-2 h-full flex flex-col justify-between hover:border-foreground/20 transition-all duration-200">
                        <a
                           href={link}
                           className="group/card block space-y-2 flex-1"
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                           <div className="flex items-start justify-between gap-2">
                              <CardTitle className="text-sm">{title}</CardTitle>
                              <ArrowRight className="size-3.5 text-muted-foreground shrink-0 mt-0.5 transition-transform duration-200 group-hover/card:translate-x-0.5 group-hover/card:text-foreground" />
                           </div>
                           <CardDescription className="text-xs leading-relaxed">
                              {description}
                           </CardDescription>
                           <div className="flex items-center gap-1 flex-wrap pt-1">
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
                        </a>
                        {image && (
                           <ImagePopupButton
                              image={image.full}
                              title={title}
                              link={link}
                              alt={`Full design of ${title}`}
                           />
                        )}
                     </Card>
                  </BlurFade>
               </li>
            ))}
         </ul>
      </BlurFade>
   );
};

