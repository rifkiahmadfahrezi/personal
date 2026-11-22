export type Bookmark = { title: string; url: string; purpose: string; tags?: string[] };

const isText = (value: unknown): value is string => typeof value === "string" && value.trim() !== "";

// Runs at build time: a bad hand edit fails the build instead of shipping.
export const parseBookmarks = (items: Partial<Record<keyof Bookmark, unknown>>[]): Bookmark[] => {
   for (const { title, url, purpose, tags } of items) {
      if (
         ![title, url, purpose].every(isText) ||
         !/^https?:\/\/.+/.test(url as string) ||
         !URL.canParse(url as string) ||
         (tags != null && !(Array.isArray(tags) && tags.every(isText)))
      ) {
         throw new Error(`Bookmark "${title}" is invalid: title, http(s) url and purpose are required, tags must be text (url: "${url}")`);
      }
   }
   return items as Bookmark[];
};

export const filterBookmarks = (items: Bookmark[], query: string, tag: string | null): Bookmark[] => {
   const q = query.trim().toLowerCase();
   return items.filter(
      ({ title, url, purpose, tags }) =>
         (!tag || tags?.includes(tag)) &&
         [title, url, purpose, ...(tags ?? [])].some((text) => text.toLowerCase().includes(q))
   );
};
