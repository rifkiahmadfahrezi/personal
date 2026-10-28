"use client";

import { useSyncExternalStore } from "react";

const format = () =>
   new Date().toLocaleTimeString("en-GB", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
   });

const subscribe = (tick: () => void) => {
   const id = setInterval(tick, 15_000);
   return () => clearInterval(id);
};

// Bandung local time. Server renders a placeholder so markup matches on hydrate.
export const LocalTime = () => {
   const time = useSyncExternalStore(subscribe, format, () => "--:--");
   return <time className="tabular-nums">{time} WIB</time>;
};
