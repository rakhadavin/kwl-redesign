import { create } from "zustand";

interface EditPreReadingMaterialFormsStore {
  isOpen: boolean;
  topicId: number;
  open: (topicId: number) => void;
  close: () => void;
}

const useEditPreReadingMaterialForms = create<EditPreReadingMaterialFormsStore>((set) => ({
  isOpen: false,
  topicId: 0,
  open: (topicId) => set({ isOpen: true, topicId }),
  close: () => set({ isOpen: false }),
}));

export default useEditPreReadingMaterialForms;
