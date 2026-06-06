import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

export const Footer = () => {
   return (
      <footer className="border-t border-border/50">
         <div className="max-w-2xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
               © {new Date().getFullYear()} {siteConfig.title}
            </p>
            <div className="flex items-center gap-3">
               <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-muted-foreground hover:text-foreground transition-colors"
               >
                  <Github className="size-4" />
               </a>
               <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-muted-foreground hover:text-foreground transition-colors"
               >
                  <Linkedin className="size-4" />
               </a>
               <a
                  href={`mailto:${siteConfig.links.email}`}
                  aria-label="Email"
                  className="text-muted-foreground hover:text-foreground transition-colors"
               >
                  <Mail className="size-4" />
               </a>
            </div>
         </div>
      </footer>
   );
};
