import { addCollection } from "@iconify/react";
import {
  BaseDirectory,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/plugin-fs";
import type { IconifyJSON } from "@iconify/react";

let fluentIconSet: IconifyJSON | null = null;

export const loadEmojis = async () => {
  const file = "fluent-emoji-flat.json";
  const options = { baseDir: BaseDirectory.AppData };
  const url =
    "https://raw.githubusercontent.com/iconify/icon-sets/refs/heads/master/json/fluent-emoji-flat.json";

  try {
    const data = await readTextFile(file, options).then((text) =>
      JSON.parse(text),
    );
    fluentIconSet = data;
    addCollection(data);
  } catch {
    const data = await fetch(url).then((res) => res.json());
    await writeTextFile(file, JSON.stringify(data), options);
    fluentIconSet = data;
    addCollection(data);
  }
};

export const getIconCategories = () => {
  // console.log(fluentIconSet);
  return fluentIconSet?.categories ?? { error: ["No data"] };
};
