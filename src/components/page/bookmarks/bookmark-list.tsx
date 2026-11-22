"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { filterBookmarks, type Bookmark } from "@/lib/bookmarks";
import { cn } from "@/lib/utils";

export const BookmarkList = ({ items }: { items: Bookmark[] }) => {
   const [query, setQuery] = useState("");
   const [tag, setTag] = useState<string | null>(null);
   const tags = [...new Set(items.flatMap((b) => b.tags ?? []))].sort();
   const shown = filterBookmarks(items, query, tag);

   return (
      <>
         {items.length > 0 && (
            <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
               <input
                  type="search"
                  aria-label="Search bookmarks"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-12 w-full rounded-full border border-border bg-transparent px-6 text-base outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-foreground md:max-w-sm"
               />
               <div role="group" aria-label="Filter by tag" className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                     <button
                        key={t}
                        type="button"
                        aria-pressed={tag === t}
                        onClick={() => setTag(tag === t ? null : t)}
                        className={cn(
                           "label min-h-9 cursor-pointer rounded-full border border-border px-4 transition-colors hover:!text-foreground focus-visible:border-foreground",
                           tag === t && "border-foreground bg-foreground !text-background hover:!text-background"
                        )}
                     >
                        {t}
                     </button>
                  ))}
               </div>
            </div>
         )}

         <p aria-live="polite" className="text-sm text-muted-foreground">
            {items.length === 0 ? "No bookmarks yet." : shown.length === 0 && "No matches."}
         </p>

         {shown.length > 0 && (
            <ul className="border-t border-border">
               {shown.map(({ title, url, purpose, tags }, i) => (
                  <li
                     key={`${url}-${i}`}
                     className="group/item relative grid gap-3 border-b border-border py-6 md:grid-cols-12 md:items-center"
                  >
                     <div className="min-w-0 md:col-span-8">
                        <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-tight tracking-[-0.03em] break-words">
                           <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-cursor="Visit"
                              className="outline-none after:absolute after:inset-0 focus-visible:underline"
                           >
                              {purpose}
                           </a>
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">{[title, ...(tags ?? [])].join(" · ")}</p>
                     </div>
                     <div className="flex min-w-0 items-center justify-between gap-3 md:col-span-4 md:justify-end">
                        <span className="label truncate">{new URL(url).hostname.replace(/^www\./, "")}</span>
                        <ArrowUpRight aria-hidden className="size-5 shrink-0 text-muted-foreground transition-all duration-500 ease-out-expo group-hover/item:rotate-45 group-hover/item:text-signal" />
                     </div>
                  </li>
               ))}
            </ul>
         )}
      </>
   );
};
