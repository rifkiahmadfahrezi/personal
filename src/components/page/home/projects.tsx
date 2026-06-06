import projects from "@/data/projects.json";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { BlurFade } from "@/components/magicui/blur-fade";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ImagePopup } from "./image-popup";

export const Projects = () => {
   return (
      <BlurFade className="space-y-3">
         <div className="space-y-0.5">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
               Selected Work
            </p>
            {/* <h2 className="text-base font-semibold tracking-tight">Projects</h2> */}
         </div>

         <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {projects.slice(0, 4).map(({ title, description, link, image, role }) => (
               <li key={link} className="relative isolate group h-full">
                  <BlurFade inView className="h-full">
                     <a
                        href={link}
                        className="group/card block h-full"
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        <Card className="p-3 gap-2 h-full hover:border-foreground/20 transition-all duration-200">
                           {image && (
                              <figure className="aspect-video w-full overflow-hidden rounded-md mb-2">
                                 <Image
                                    src={image.thumbnail}
                                    alt={`${title} preview`}
                                    width={500}
                                    height={300}
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover/card:scale-[1.02]"
                                 />
                              </figure>
                           )}
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
                  {image && (
                     <ImagePopup image={image.full} alt={`Full design of ${title}`} />
                  )}
               </li>
            ))}
         </ul>
      </BlurFade>
   );
};
