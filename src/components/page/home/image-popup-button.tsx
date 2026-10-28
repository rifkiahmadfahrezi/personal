"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
   Drawer,
   DrawerContent,
   DrawerHeader,
   DrawerTitle,
   DrawerDescription,
   DrawerTrigger,
   DrawerClose,
} from "@/components/ui/drawer";
import { Maximize2, ExternalLink, X, Loader2 } from "lucide-react";

interface ImagePopupButtonProps {
   image: string;
   alt: string;
   title?: string;
   link?: string;
   className?: string;
}

export const ImagePopupButton = ({
   image,
   alt,
   title,
   link,
   className,
}: ImagePopupButtonProps) => {
   const [isOpen, setIsOpen] = useState(false);
   const [isImageLoading, setIsImageLoading] = useState(true);

   return (
      <Drawer
         open={isOpen}
         onOpenChange={(open) => {
            setIsOpen(open);
            if (open) setIsImageLoading(true);
         }}
      >
         <DrawerTrigger asChild>
            <button
               type="button"
               data-cursor="Open"
               className={cn(
                  "label inline-flex h-9 shrink-0 items-center whitespace-nowrap gap-1.5 rounded-full border border-border px-3 transition-colors duration-300 hover:border-foreground hover:!text-foreground",
                  className
               )}
            >
               <Maximize2 className="size-3 shrink-0" />
               <span>Full design</span>
            </button>
         </DrawerTrigger>
         <DrawerContent className="max-h-[90vh]">
            <div className="mx-auto w-full max-w-4xl flex flex-col h-full overflow-hidden">
               <DrawerHeader className="flex flex-row items-center justify-between border-b pb-3 pt-4 px-4 sm:px-6 shrink-0">
                  <div className="space-y-0.5 text-left">
                     <DrawerTitle className="text-base font-semibold">
                        {title ? `${title} — Full Design` : "Full Design Preview"}
                     </DrawerTitle>
                     <DrawerDescription className="text-xs text-muted-foreground">
                        Scroll down inside the preview to view the complete design screenshot.
                     </DrawerDescription>
                  </div>
                  <div className="flex items-center gap-2">
                     {link && (
                        <Button
                           variant="ghost"
                           size="sm"
                           className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-foreground hidden sm:flex"
                           asChild
                        >
                           <a href={link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="size-3.5" />
                              <span>Visit website</span>
                           </a>
                        </Button>
                     )}
                     <DrawerClose asChild>
                        <Button variant="ghost" size="icon" className="size-8 rounded-full">
                           <X className="size-4" />
                           <span className="sr-only">Close</span>
                        </Button>
                     </DrawerClose>
                  </div>
               </DrawerHeader>

               {/* Scrollable Container with vaul drag disabled so scrolling works smoothly */}
               <div
                  data-vaul-no-drag
                  data-lenis-prevent
                  className="flex-1 overflow-y-auto p-4 sm:p-6 max-h-[calc(90vh-80px)] overscroll-contain"
               >
                  <div className="relative flex justify-center w-full min-h-[400px] bg-muted/20 rounded-lg p-2 sm:p-4 border border-border/40 overflow-hidden">
                     {isImageLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-xs z-10 p-6 min-h-[350px]">
                           <Loader2 className="size-7 animate-spin text-muted-foreground" />
                           <p className="text-xs text-muted-foreground font-medium animate-pulse">
                              Loading design preview...
                           </p>
                        </div>
                     )}
                     <Image
                        src={image}
                        alt={alt}
                        width={1400}
                        height={2800}
                        unoptimized
                        onLoad={() => setIsImageLoading(false)}
                        className={cn(
                           "w-full h-auto rounded-md shadow-sm transition-opacity duration-300",
                           isImageLoading ? "opacity-0" : "opacity-100"
                        )}
                     />
                  </div>
               </div>
            </div>
         </DrawerContent>
      </Drawer>
   );
};


