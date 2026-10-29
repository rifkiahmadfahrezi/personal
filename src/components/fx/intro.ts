"use client";

import { useSyncExternalStore } from "react";

// "Is the page uncovered?" Shared by the preloader, the route curtain and mount animations,
// so intro animations play when the user can see them, not hidden behind an overlay.
let ready = false;
const subs = new Set<() => void>();

export const setIntroReady = (value: boolean) => {
   if (ready === value) return;
   ready = value;
   subs.forEach((fn) => fn());
};

const subscribe = (fn: () => void) => {
   subs.add(fn);
   return () => subs.delete(fn);
};

export const useIntroReady = () => useSyncExternalStore(subscribe, () => ready, () => false);
