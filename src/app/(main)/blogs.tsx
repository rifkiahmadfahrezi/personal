"use client"

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { BlurFade } from "@/components/magicui/blur-fade";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";


type BlogPost = {
   title: string
   link: string
   date: string
}


export const Blogs = () => {
   const [blogs, setBlogs] = useState<BlogPost[]>([])
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(false)

   useEffect(() => {
      setLoading(true)
      getBlogs()
         .then((data) => {
            if (!data) throw new Error("No data found")
            setBlogs(data)
            console.log(data)
         })
         .catch((e) => {
            console.error(e)
            setError(true)
         })
         .finally(() => setLoading(false))
   }, [])

   if(loading){
      return (
         <>
            {Array(4).fill(0).map((_, i) => (
               <BlurFade key={i} className="grid grid-cols-1 gap-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-6 w-full" />
               </BlurFade>
            ))}
         </>
      )
   }

   if(error) return (
      <BlurFade className="grid grid-cols-1 gap-2">
         <h2 className="font-semibold">Blogs</h2>
         <p className="text-muted-foreground">Failed to load blogs</p>
      </BlurFade>
   )

   return (
      <BlurFade className="grid grid-cols-1 gap-2">
         <h2 className="font-semibold">Blogs</h2>

         <ul className="grid grid-cols-1 gap-3">
            {blogs.map(({ title, date, link }) => (
               <li key={link}>
                  <BlurFade className="h-full">
                     <a href={link} target="_blank">
                        <Card className="p-3 gap-1 h-full hover:-translate-y-1 transition duration-150">
                           <CardDescription className="text-sm text-muted-foreground">{new Date(date).toLocaleDateString()}</CardDescription>
                           <CardTitle className="mb-1 line-clamp-2">{title}</CardTitle>
                        </Card>
                     </a>
                  </BlurFade>
               </li>
            ))}
         </ul>
         <Button asChild variant={"link"}>
            <a href="https://medium.com/@rifkiaf" target="_blank">See more</a>
         </Button>
      </BlurFade>
   )
};

const getBlogs = async () => {

   const blogs = await fetch("/api/blogs")

   return await blogs.json()
}
