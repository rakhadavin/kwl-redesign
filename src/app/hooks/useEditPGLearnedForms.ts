import { create } from "zustand";

interface EditPGLearnedFormsStore {
  isOpen: boolean;
  topicId: number;
  learnedId: number;
  open: (topicId: number, learnedId:any) => void;
  close: () => void;
}

const useEditPGLearnedForms = create<EditPGLearnedFormsStore>((set) => ({
  isOpen: false,
  topicId:0,
  learnedId: 0,
  open: (topicId, learnedId) => set({ isOpen: true, topicId, learnedId }),
  close: () => set({ isOpen: false }),
}));

export default useEditPGLearnedForms;
