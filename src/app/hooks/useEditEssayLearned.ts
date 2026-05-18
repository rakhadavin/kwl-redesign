import { create } from "zustand";

interface EditEssayLearnedFormsStore {
  isOpen: boolean;
  topicId: number;
  learnedId: number;
  open: (topicId: number, learnedId:number) => void;
  close: () => void;
}

const useEditEssayLearnedForms = create<EditEssayLearnedFormsStore>((set) => ({
  isOpen: false,
  topicId:0,
  learnedId: 0,
  open: (topicId, learnedId) => set({ isOpen: true, topicId, learnedId }),
  close: () => set({ isOpen: false }),
}));

export default useEditEssayLearnedForms;
