import projects from "@/data/projects.json"
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { BlurFade } from "@/components/magicui/blur-fade";
import type { Metadata } from "next";

export const metadata : Metadata = {
   title: "Project"
}

const Projects = () => {
   return (
      <BlurFade className="grid grid-cols-1 gap-2">
         <h2 className="font-semibold">Projects</h2>

         <ul className="grid grid-cols-1 gap-1">
            {projects.map(({ title, description, link }) => (
               <li key={link}>
                  <BlurFade inView className="h-full">
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

export default Projects;