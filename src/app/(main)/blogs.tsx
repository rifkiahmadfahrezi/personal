"use client"

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { SplitText } from "@/components/fx/split-text";

type BlogPost = {
   title: string;
   link: string;
   date: string;
};

export const Blogs = () => {
   const [blogs, setBlogs] = useState<BlogPost[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);

   useEffect(() => {
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

   return (
      <section
         id="writing"
         aria-labelledby="writing-title"
         className="gutter grid scroll-mt-20 gap-10 py-[clamp(5rem,12vw,10rem)] md:grid-cols-12"
      >
         <div className="md:col-span-4">
            <div className="md:sticky md:top-28 space-y-4">
               <h2 id="writing-title" className="text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-none tracking-[-0.045em]">
                  <SplitText text="Writing" inView />
               </h2>
               <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                  Notes on front-end craft, published on Medium.
               </p>
               <a
                  href="https://medium.com/@rifkiaf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group roll label !text-foreground"
               >
                  <span>Read all posts ↗</span>
                  <span aria-hidden className="text-signal">Read all posts ↗</span>
               </a>
            </div>
         </div>

         <div className="md:col-span-8">
            {loading && (
               <ul className="border-t border-border">
                  {[0, 1, 2].map((i) => (
                     <li key={i} className="space-y-3 border-b border-border py-8">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-7 w-4/5" />
                     </li>
                  ))}
               </ul>
            )}

            {error && (
               <p className="border-y border-border py-8 text-muted-foreground">
                  Unable to load posts right now.
               </p>
            )}

            {!loading && !error && (
               <ul className="border-t border-border">
                  {blogs.map(({ title, date, link }) => (
                     <li key={link} className="border-b border-border">
                        <a
                           href={link}
                           target="_blank"
                           rel="noopener noreferrer"
                           data-cursor="Read"
                           className="group relative isolate flex items-start justify-between gap-6 overflow-hidden py-8 outline-none focus-visible:bg-muted before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:bg-muted before:transition-transform before:duration-500 before:ease-out-expo hover:before:scale-y-100"
                        >
                           <div className="space-y-2 transition-transform duration-500 ease-out-expo group-hover:translate-x-3">
                              <time dateTime={new Date(date).toISOString()} className="label block tabular-nums">
                                 {new Date(date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                 })}
                              </time>
                              <span className="block text-[clamp(1.25rem,2vw,1.875rem)] font-medium leading-tight tracking-[-0.025em] line-clamp-2">
                                 {title}
                              </span>
                           </div>
                           <ArrowUpRight className="mt-6 size-6 shrink-0 text-muted-foreground transition-all duration-500 ease-out-expo group-hover:-translate-x-3 group-hover:rotate-45 group-hover:text-signal" />
                        </a>
                     </li>
                  ))}
               </ul>
            )}
         </div>
      </section>
   );
};

const getBlogs = async () => {
   const blogs = await fetch("/api/blogs");
   return await blogs.json();
};
