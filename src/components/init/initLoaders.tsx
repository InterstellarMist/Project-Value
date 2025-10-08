"use client";
import { type ReactNode, useEffect } from "react";
import { loadEmojis } from "@/data/iconifyFetch";
import { useSettingsStore } from "@/store/userSettingsStore";

export const InitLoaders = ({ children }: { children: ReactNode }) => {
  const loadSettings = useSettingsStore((s) => s.load);

  useEffect(() => {
    // Android back gesture
    window.androidBackCallback = () => {
      if (window.history.length > 1) {
        window.history.back();
        return false; // don't exit
      }
      return true; // exit app
    };

    // Load user settings from local store
    loadSettings();

    // Load Emojis
    async function initLoadEmojis() {
      await loadEmojis();
    }
    initLoadEmojis();
    console.log("Loaded Emojis!");
  }, [loadSettings]);
  return <>{children}</>;
};
