"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
   Drawer,
   DrawerContent,
   DrawerTrigger,
 } from "@/components/ui/drawer"
 import { ScrollArea } from "@/components/ui/scroll-area"
 

export const ImagePopup = ({
   image,
   alt,
   className,
   ...props
}: {
   image: string
   alt: string
} & React.ComponentProps<typeof ScrollArea>) => {
   const [isOpen, setIsOpen] = useState(false)

   return (

      <>
      <Drawer>
         <DrawerTrigger asChild>
            <Button 
               onClick={() => setIsOpen(!isOpen)}
               className={cn(`border-none 
               rounded-tl-none rounded-tr-none transition duration-300
               w-full md:absolute md:top-[95%] -translate-y-full md:group-hover:translate-y-0 md:group-focus-within:translate-y-0 pt-5 h-auto left-0 z-[-10]`, className)}>
               Show full design
            </Button>
         </DrawerTrigger>
         <DrawerContent>
            <ScrollArea className="p-5  mx-auto h-[700px] pb-48 md:pb-56" {...props}>
               <Image 
                  width={500}
                  height={500}
                  className="object-cover w-full h-full rounded-lg"
                  alt={alt}
                  src={image}/>
            </ScrollArea>
         </DrawerContent>
      </Drawer>


      </>
   )
}
