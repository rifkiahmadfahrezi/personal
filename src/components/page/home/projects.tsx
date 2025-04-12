import projects from "@/data/projects.json"
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { BlurFade } from "@/components/magicui/blur-fade";

export const Projects = () => {
   return (
      <BlurFade className="grid grid-cols-1 gap-2">
         <h2 className="font-semibold">Projects</h2>

         <ul className="grid grid-cols-2 gap-1">
            {projects.slice(0,3).map(({ title, description, link }) => (
               <li key={link}>
                  <BlurFade className="h-full">
                     <a href={link} target="_blank">
                        <Card className="p-3 gap-1 h-full hover:-translate-y-1 transition duration-150">
                           <CardTitle className="mb-1">{title}</CardTitle>
                           <CardDescription>{description}</CardDescription>
                        </Card>
                     </a>
                  </BlurFade>
               </li>
            ))}
         </ul>
      </BlurFade>
   )
};
