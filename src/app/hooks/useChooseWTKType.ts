import { create } from "zustand";

interface ChooseWTKTypeStore {
  isOpen: boolean;
  topicId?: number;
  open: (topicId: number) => void;
  close: () => void;
}

const useChooseWTKType = create<ChooseWTKTypeStore>((set) => ({
  isOpen: false,
  open: (topicId) => set({ isOpen: true, topicId }),
  close: () => set({ isOpen: false }),
}));

export default useChooseWTKType;
