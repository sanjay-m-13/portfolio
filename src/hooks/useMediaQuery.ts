"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string, callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getSnapshot(query: string) {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia(query).matches;
}

function getServerSnapshot() {
  return false;
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => subscribe(query, callback),
    () => getSnapshot(query),
    getServerSnapshot
  );
}
