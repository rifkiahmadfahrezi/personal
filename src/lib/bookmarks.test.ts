import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { filterBookmarks, parseBookmarks, type Bookmark } from "./bookmarks";

const items: Bookmark[] = [
   { title: "Coolors", url: "https://coolors.co", purpose: "Find color palettes", tags: ["design"] },
   { title: "Regex101", url: "https://regex101.com", purpose: "Test regex" },
];
const titles = (query: string, tag: string | null = null) =>
   filterBookmarks(items, query, tag).map((b) => b.title);

test("filters", () => {
   assert.deepEqual(titles(""), ["Coolors", "Regex101"]);
   assert.deepEqual(titles("  PALETTES "), ["Coolors"]);
   assert.deepEqual(titles("regex101.com"), ["Regex101"]);
   assert.deepEqual(titles("design"), ["Coolors"]);
   assert.deepEqual(titles("", "design"), ["Coolors"]);
   assert.deepEqual(titles("regex", "design"), []);
});

test("rejects bad entries", () => {
   assert.deepEqual(parseBookmarks(items), items);
   const rejects = (patch: object) => assert.throws(() => parseBookmarks([{ ...items[0], ...patch }]), /^Error: Bookmark/);
   rejects({ url: "javascript:alert(1)" });
   rejects({ url: "https://foo bar" });
   rejects({ url: undefined });
   rejects({ purpose: undefined });
   rejects({ title: " " });
   rejects({ tags: ["a", null] });
   rejects({ tags: "design" });
});

test("CMS pattern only accepts URLs the build accepts", () => {
   const yaml = readFileSync(new URL("../../.pages.yml", import.meta.url), "utf8");
   const regex = new RegExp(yaml.match(/regex: '(.+)'/)![1]);
   for (const url of ["https://coolors.co", "http://localhost:3000/a?b=c#d", "https://a.co/x%20y", "https://a.co?q=1"]) {
      assert.match(url, regex);
      parseBookmarks([{ ...items[0], url }]);
   }
   for (const url of ["https://foo bar", "https:// a.co", "https://%", "https://javascript:alert(1)", "javascript:alert(1)"]) {
      assert.doesNotMatch(url, regex);
   }
});
