"use client"

import { BlurFade } from "@/components/magicui/blur-fade";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";

type BlogPost = {
   title: string;
   link: string;
   date: string;
};

export const Blogs = () => {
   const [blogs, setBlogs] = useState<BlogPost[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);

   useEffect(() => {
      setLoading(true);
      getBlogs()
         .then((data) => {
            if (!data) throw new Error("No data found");
            setBlogs(data);
         })
         .catch(() => {
            setError(true);
         })
         .finally(() => setLoading(false));
   }, []);

   if (loading) {
      return (
         <div className="space-y-3">
            {Array(3)
               .fill(0)
               .map((_, i) => (
                  <BlurFade key={i} className="space-y-2">
                     <Skeleton className="h-4 w-24" />
                     <Skeleton className="h-5 w-full" />
                  </BlurFade>
               ))}
         </div>
      );
   }

   if (error)
      return (
         <BlurFade className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
               From the Blog
            </p>
            {/* <h2 className="text-base font-semibold tracking-tight">Writing</h2> */}
            <p className="text-sm text-muted-foreground">
               Unable to load posts right now.
            </p>
         </BlurFade>
      );

   return (
      <BlurFade className="space-y-3">
         <div className="space-y-0.5">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
               From the Blog
            </p>
            {/* <h2 className="text-base font-semibold tracking-tight">Writing</h2> */}
         </div>

         <ul className="divide-y divide-border">
            {blogs.map(({ title, date, link }) => (
               <li key={link}>
                  <BlurFade inView>
                     <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start justify-between gap-4 py-3 transition-colors hover:text-foreground"
                     >
                        <span className="text-sm font-medium leading-snug line-clamp-2 group-hover:underline underline-offset-2 decoration-muted-foreground/40">
                           {title}
                        </span>
                        <time
                           dateTime={new Date(date).toISOString()}
                           className="text-xs text-muted-foreground whitespace-nowrap mt-0.5 tabular-nums"
                        >
                           {new Date(date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                           })}
                        </time>
                     </a>
                  </BlurFade>
               </li>
            ))}
         </ul>

         <a
            href="https://medium.com/@rifkiaf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
         >
            Read all posts
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
         </a>
      </BlurFade>
   );
};

const getBlogs = async () => {
   const blogs = await fetch("/api/blogs");
   return await blogs.json();
};
