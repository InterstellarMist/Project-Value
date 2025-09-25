import { create } from "zustand";

interface DrawerStore {
  openDrawer: boolean;
  setOpenDrawer: (state: boolean) => void;
}

export const useDrawerState = create<DrawerStore>((set) => ({
  openDrawer: false,
  setOpenDrawer: (state) => set({ openDrawer: state }),
}));
