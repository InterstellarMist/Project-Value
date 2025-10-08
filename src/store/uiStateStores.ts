import { create } from "zustand";

type Snap = number | string | null;
export interface SetSnap {
  setSnap: (val: Snap) => void;
}

interface DrawerStore extends SetSnap {
  isEdit: boolean;
  openDrawer: boolean;
  setOpenDrawer: (openDrawer: boolean, isEdit: boolean) => void;
  snap: Snap;
  toggleSnap: () => void;
}

export const snapPoints = [0.68, 1];

export const useDrawerState = create<DrawerStore>((set) => ({
  isEdit: false,
  openDrawer: false,
  setOpenDrawer: (openDrawer, isEdit) => set({ openDrawer, isEdit }),
  snap: snapPoints[0],
  setSnap: (val: Snap) => set({ snap: val }),
  toggleSnap: () =>
    set((state) => ({
      snap: state.snap === 1 ? snapPoints[0] : snapPoints[1],
    })),
}));
