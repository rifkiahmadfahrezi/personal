import { siteConfig } from "@/config/site";
import home from "@/data/home.json"
import socials from "@/data/links.json"
import { Button, type ButtonVariants } from "@/components/ui/button";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
   Avatar,
   AvatarFallback,
   AvatarImage,
 } from "@/components/ui/avatar"

export const Hero = () => {
   return (
      <>
      <div className="space-y-2">
         <BlurFade inView className="space-y-2">
            <Avatar className="size-14">
               <AvatarImage src="me.png" className="grayscale-100" alt={siteConfig.title} />
               <AvatarFallback>{siteConfig.title[0]}</AvatarFallback>
            </Avatar>
         </BlurFade>
         <BlurFade inView className="space-y-2">
            <h2 className="font-semibold">{siteConfig.title}</h2>
            <div 
               className="prose dark:prose-invert max-w-none" 
               dangerouslySetInnerHTML={{ __html: home.content }} />
         </BlurFade>
         <BlurFade inView>
            <ul className="flex items-center justify-start flex-wrap gap-2">
               {socials.map(({ link, name, variant }) => (
                  <li key={link}>
                     <Button className="active:translate-y-0.5" asChild variant={variant as ButtonVariants["variant"]} size={"sm"}>
                        <a 
                           target={link.startsWith("http") ? "_blank" : "_self"} href={link}>
                           {name}
                        </a>
                     </Button>
                  </li>
               ))}
            </ul>
         </BlurFade>
      </div>
      </>
   )
};
