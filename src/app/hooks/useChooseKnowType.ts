import { create } from "zustand";

interface ChooseKnowTypeStore {
  isOpen: boolean;
  topicId?: number;
  open: (topicId: number) => void;
  close: () => void;
}

const useChooseKnowType = create<ChooseKnowTypeStore>((set) => ({
  isOpen: false,
  open: (topicId) => set({ isOpen: true, topicId }),
  close: () => set({ isOpen: false }),
}));

export default useChooseKnowType;
