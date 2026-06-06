import projects from "@/data/projects.json"
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { BlurFade } from "@/components/magicui/blur-fade";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ImagePopup } from "./image-popup";

export const Projects = () => {
   return (
      <BlurFade className="grid grid-cols-1 gap-2 mb-14">
         <h2 className="font-semibold">Projects</h2>

         <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {projects.slice(0,4).map(({ title, description, link, image, role }) => (
               <li key={link} className="relative isolate group h-full">
                  <BlurFade className="h-full z-40">
                     <a href={link} className="group" target="_blank">
                        <Card 
                           className="p-3 z-20 gap-1 h-full hover:-translate-y-1 transition duration-150 pb-14">
                        <span
                           aria-hidden="true"
                           className="absolute bottom-2 right-2 size-10 rounded-full grid place-items-center border bg-background rotate-90 group-hover:-rotate-5 transition duration-150">
                           <ArrowUpRight/>
                        </span>
                           {image && (
                              <figure className="aspect-vide w-full overflow-hidden rounded-lg mb-5">
                                 <Image
                                    src={image.thumbnail}
                                    alt={title}
                                    width={500}
                                    height={300}
                                    className="object-cover w-full h-full"
                                 />
                              </figure>
                           )}
                           <CardTitle className="mb-1">{title}</CardTitle>
                           <CardDescription>{description}</CardDescription>
                           <div className="flex items-center gap-1 flex-wrap">
                              {role.map((r) => (
                                 <Badge key={"r"} variant="outline">
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
   )
};
