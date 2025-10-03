"use client";
import { type ReactNode, useEffect } from "react";
import { loadEmojis } from "@/data/iconifyFetch";

export const InitLoaders = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    // Android back gesture
    window.androidBackCallback = () => {
      if (window.history.length > 1) {
        window.history.back();
        return false; // don't exit
      }
      return true; // exit app
    };

    // Load Emojis
    async function initLoadEmojis() {
      await loadEmojis();
    }
    initLoadEmojis();
    console.log("Loaded Emojis!");
  }, []);
  return <>{children}</>;
};
