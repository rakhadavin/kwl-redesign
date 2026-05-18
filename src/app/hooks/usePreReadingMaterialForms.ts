import { create } from "zustand";

interface PreReadingMaterialFormsStore {
  isOpen: boolean;
  topicId: number;
  open: (topicId?: number) => void;
  close: () => void;
}

const usePreReadingMaterialForms = create<PreReadingMaterialFormsStore>((set) => ({
  isOpen: false,
  topicId: 0,
  open: (topicId) => set({ isOpen: true, topicId }),
  close: () => set({ isOpen: false }),
}));

export default usePreReadingMaterialForms;
