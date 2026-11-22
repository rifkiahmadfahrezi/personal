export type Bookmark = { title: string; url: string; purpose: string; tags?: string[] };

// Runs at build time: a bad hand edit fails the build instead of shipping.
export const parseBookmarks = (items: Bookmark[]): Bookmark[] => {
   for (const { title, url } of items) {
      if (!/^https?:\/\/.+/.test(url) || !URL.canParse(url)) {
         throw new Error(`Bookmark "${title}" needs a valid http(s) URL, got "${url}"`);
      }
   }
   return items;
};

export const filterBookmarks = (items: Bookmark[], query: string, tag: string | null): Bookmark[] => {
   const q = query.trim().toLowerCase();
   return items.filter(
      ({ title, url, purpose, tags }) =>
         (!tag || tags?.includes(tag)) &&
         [title, url, purpose, ...(tags ?? [])].some((text) => text.toLowerCase().includes(q))
   );
};
