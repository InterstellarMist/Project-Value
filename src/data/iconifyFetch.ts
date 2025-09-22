import { addCollection } from "@iconify/react";
import {
  BaseDirectory,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/plugin-fs";
import type { IconifyCategories, IconifyJSON } from "@iconify/types";
import MiniSearch from "minisearch";
import { listIcons } from "@iconify/react";

let fluentIconCategories: IconifyCategories | null = null;

const minisearch: MiniSearch = new MiniSearch({
  fields: ["category", "icon"],
  storeFields: ["id", "category"],
  searchOptions: {
    fuzzy: 0.2,
    prefix: true,
  },
});

const handleIconSetData = (data: IconifyJSON) => {
  try {
    minisearch.addAll(preprocessIconSet(data));
  } catch {}
  addCollection(data);
  console.log(data);
  console.log(data.categories ?? {});
  fluentIconCategories = data.categories ?? {};
  console.log(fluentIconCategories);
};

export const loadEmojis = async () => {
  const file = "fluent-emoji-flat.json";
  const options = { baseDir: BaseDirectory.AppData };
  const url =
    "https://raw.githubusercontent.com/iconify/icon-sets/refs/heads/master/json/fluent-emoji-flat.json";

  try {
    const data = await readTextFile(file, options).then((text) =>
      JSON.parse(text),
    );
    handleIconSetData(data);
  } catch {
    const data = await fetch(url).then((res) => res.json());
    await writeTextFile(file, JSON.stringify(data), options);
    handleIconSetData(data);
  }
};

export const getIconCategories = () => {
  if (!fluentIconCategories) {
    console.log(fluentIconCategories);
  }
  console.log(fluentIconCategories);
  return Object.keys(fluentIconCategories ?? {});
};

// ======================= Icon search using minisearch =======================================
const preprocessIconSet = (iconSet: IconifyJSON) => {
  const searchData = [];
  for (const [category, icons] of Object.entries(iconSet.categories ?? {})) {
    for (const icon of icons) {
      searchData.push({
        id: `${iconSet.prefix}:${icon}`,
        icon,
        category,
      });
    }
  }
  console.log(searchData);
  return searchData;
};

export const searchIcons = (query: string, category: string) => {
  if (!query) {
    if (category === "All") {
      return listIcons("", "fluent-emoji-flat");
    } else {
      console.log(fluentIconCategories?.[category]);
      return fluentIconCategories?.[category];
    }
  }

  if (category === "All") {
    return minisearch.search(query).map((val) => val.id);
  } else {
    return minisearch
      .search(query, {
        filter: (result) => result.category === category,
      })
      .map((val) => val.id);
  }
};
