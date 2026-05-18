import { create } from "zustand";

interface ChooseLearnedTypeStore {
  isOpen: boolean;
  topicId?: number;
  open: (topicId: number) => void;
  close: () => void;
}

const useChooseLearnedType = create<ChooseLearnedTypeStore>((set) => ({
  isOpen: false,
  open: (topicId) => set({ isOpen: true, topicId }),
  close: () => set({ isOpen: false }),
}));

export default useChooseLearnedType;
