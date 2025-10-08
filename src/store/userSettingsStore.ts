import { load, type Store } from "@tauri-apps/plugin-store";
import {
  create,
  type StoreApi,
  type UseBoundStore,
  type StateCreator,
} from "zustand";
import { capitalize } from "@/lib/utils";

let localStore: Store | null = null;

// Types
type Themes = "light" | "dark" | "system";
type Setters<T> = {
  [Key in keyof T as `set${Capitalize<string & Key>}`]: (val: T[Key]) => void;
};

interface SettingsStoreValues {
  theme: Themes;
  notification: boolean;
  currency: string;
  language: string;
  accountFavorites: number[];
}

type SettingsSetters = Setters<SettingsStoreValues>;
interface SettingsStore extends SettingsStoreValues, SettingsSetters {
  load: () => Promise<void>;
}
const formatSetter = (key: string) => `set${capitalize(key)}`;
const createSetters = (set: Parameters<StateCreator<SettingsStore>>[0]) => {
  const setters = {} as SettingsSetters;

  for (const key of Object.keys(defaults) as (keyof SettingsStoreValues)[]) {
    setters[formatSetter(key) as keyof SettingsSetters] = (val) => {
      set({ [key]: val });
      saveStore(key, val);
    };
  }
  return setters;
};

// Main
const defaults: SettingsStoreValues = {
  theme: "light",
  notification: false,
  currency: "USD",
  language: "en",
  accountFavorites: [],
};

const loadLocalStore = async () => {
  if (!localStore) {
    localStore = await load("user-settings.json", {
      defaults: defaults as SettingsStoreValues & { [key: string]: unknown },
    });
  }
  return localStore;
};

const saveStore = async (key: keyof SettingsStoreValues, value: unknown) => {
  const localStore = await loadLocalStore();
  await localStore.set(key, value);
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  ...defaults,
  ...createSetters(set),
  load: async () => {
    const localStore = await loadLocalStore();
    const entries = await Promise.all(
      Object.keys(defaults).map(async (key) => [
        key,
        await localStore.get(key),
      ]),
    );
    const storeValues = Object.fromEntries(entries);
    console.log(storeValues);
    set(storeValues);
  },
}));

export const createSelectors = <
  S extends UseBoundStore<StoreApi<object>>,
  T extends ReturnType<S["getState"]>,
>(
  store: S,
) => {
  const use = {} as { [K in keyof T]: () => T[K] };
  for (const key of Object.keys(store.getState()) as (keyof T)[]) {
    use[key] = () => store((s) => s[key as keyof typeof s]);
  }
  return use;
};

export const useSetting = createSelectors(useSettingsStore);
