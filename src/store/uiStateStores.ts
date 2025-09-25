import { create } from "zustand";

interface DrawerStore {
  isEdit: boolean;
  openDrawer: boolean;
  setOpenDrawer: (openDrawer: boolean, isEdit: boolean) => void;
}

export const useDrawerState = create<DrawerStore>((set) => ({
  isEdit: false,
  openDrawer: false,
  setOpenDrawer: (openDrawer, isEdit) => set({ openDrawer, isEdit }),
}));
