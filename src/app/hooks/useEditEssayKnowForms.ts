import { create } from "zustand";

interface EditEssayKnowFormsStore {
  isOpen: boolean;
  topicId: number;
  knowId: number;
  open: (topicId: number, knowId: number) => void;
  close: () => void;
}

const useEditEssayKnowForms = create<EditEssayKnowFormsStore>((set) => ({
  isOpen: false,
  topicId:0,
  knowId:0,
  open: (topicId, knowId) => set({ isOpen: true, topicId, knowId }),
  close: () => set({ isOpen: false }),
}));

export default useEditEssayKnowForms;
