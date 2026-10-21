import { siteConfig } from "@/config/site";
import home from "@/data/home.json";
import socials from "@/data/links.json";
import { Button, type ButtonVariants } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from "@/components/ui/avatar";
import { Mail, FileText, Github, Linkedin, ChevronDown } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
   Mail,
   FileText,
   Github,
   Linkedin,
};

export const Hero = () => {
   return (
      <section aria-label="About me" className="space-y-6">
         <BlurFade inView className="flex items-center gap-4">
            <Avatar className="size-16 ring-2 ring-border grayscale-100">
               <AvatarImage src="me.png" alt={`Photo of ${siteConfig.title}`} />
               <AvatarFallback>RF</AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
               <h1 className="text-lg font-semibold tracking-tight">{siteConfig.title}</h1>
               <p className="text-sm text-muted-foreground">Front-end Developer</p>
            </div>
         </BlurFade>

         <BlurFade inView delay={0.1}>
            <div
               className="prose dark:prose-invert prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-strong:font-medium max-w-none text-[0.935rem]"
               dangerouslySetInnerHTML={{ __html: home.content }}
            />
         </BlurFade>

         <BlurFade inView delay={0.2}>
            <ul className="flex items-center justify-start flex-wrap gap-2">
               {socials.map(({ link, name, variant, icon, ...rest }) => {
                  const Icon = icon ? iconMap[icon] : null;
                  const options = "options" in rest ? rest.options : null;
                  if (options) {
                     return (
                        <li key={link}>
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                 <Button
                                    className="active:translate-y-0.5 gap-1.5 group"
                                    variant={variant as ButtonVariants["variant"]}
                                    size="sm"
                                 >
                                    {Icon && <Icon className="size-3.5" />}
                                    {name}
                                    <ChevronDown className="size-3.5 transition-transform group-data-[state=open]:rotate-180" />
                                 </Button>
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
                        </li>
                     );
                  }
                  return (
                     <li key={link}>
                        <Button
                           className="active:translate-y-0.5 gap-1.5"
                           asChild
                           variant={variant as ButtonVariants["variant"]}
                           size="sm"
                        >
                           <a
                              target={link.startsWith("http") ? "_blank" : "_self"}
                              rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
                              href={link}
                           >
                              {Icon && <Icon className="size-3.5" />}
                              {name}
                           </a>
                        </Button>
                     </li>
                  );
               })}
            </ul>
         </BlurFade>
      </section>
   );
};
