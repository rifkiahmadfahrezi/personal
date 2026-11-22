import type { Metadata } from "next";
import { BookmarkList } from "@/components/page/bookmarks/bookmark-list";
import { SplitText } from "@/components/fx/split-text";
import data from "@/data/bookmarks.json";
import { parseBookmarks } from "@/lib/bookmarks";

export const metadata: Metadata = {
   title: "Bookmarks",
   description: "Websites Rifki Ahmad Fahrezi keeps, each for a specific purpose.",
};

const bookmarks = parseBookmarks(data);

const Bookmarks = () => {
   return (
      <section aria-labelledby="bookmarks-title" className="gutter pt-36 pb-[clamp(5rem,12vw,10rem)]">
         <div className="mb-12 grid gap-6 md:mb-20 md:grid-cols-12 md:items-end">
            <h1 id="bookmarks-title" className="text-[clamp(3rem,11vw,11rem)] font-semibold leading-[0.88] tracking-[-0.045em] md:col-span-9">
               <SplitText text="All" by="char" />{" "}
               <span className="font-serif font-normal italic tracking-[-0.02em] text-signal">
                  <SplitText text="bookmarks" by="char" delay={0.1} stagger={0.03} />
               </span>
            </h1>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground md:col-span-3 md:justify-self-end">
               Sites I keep for a reason.
            </p>
         </div>
         <BookmarkList items={bookmarks} />
      </section>
   );
};

export default Bookmarks;
