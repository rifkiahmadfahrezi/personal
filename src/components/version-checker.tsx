"use client";

import { useEffect, useState } from "react";

const CHECK_INTERVAL_MS = 5 * 60 * 1000;

export function VersionChecker() {
  const [newVersionAvailable, setNewVersionAvailable] = useState(false);

  useEffect(() => {
    const currentBuildId = process.env.NEXT_PUBLIC_BUILD_ID;
 
    const check = async () => {
      try {
        const res = await fetch("/api/version", { cache: "no-store" });
        const { buildId } = await res.json();
        if (buildId && buildId !== currentBuildId) {
          setNewVersionAvailable(true);
        }
      } catch {
        // network hiccup, ponytail: skip retry/backoff, next interval covers it
      }
    };

    const id = setInterval(check, CHECK_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  if (!newVersionAvailable) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border bg-background px-4 py-2 text-sm shadow-lg">
      <span>New version available.</span>
      <button
        onClick={() => window.location.reload()}
        className="font-medium underline underline-offset-2"
      >
        Refresh
      </button>
    </div>
  );
}
