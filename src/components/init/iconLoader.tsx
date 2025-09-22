"use client";
import { type ReactNode, useEffect } from "react";
import { loadEmojis } from "@/data/iconifyFetch";

export const IconLoader = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    async function initLoadEmojis() {
      await loadEmojis();
    }
    initLoadEmojis();
    console.log("Loaded Emojis!");
  });
  return <>{children}</>;
};
