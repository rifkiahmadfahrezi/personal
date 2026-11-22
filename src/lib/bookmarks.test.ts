import test from "node:test";
import assert from "node:assert/strict";
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

test("rejects non-http(s) URLs", () => {
   assert.deepEqual(parseBookmarks(items), items);
   assert.throws(() => parseBookmarks([{ ...items[0], url: "javascript:alert(1)" }]));
});
