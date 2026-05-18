import { create } from "zustand";

interface CreatePGKnowFormsStore {
  isOpen: boolean;
  topicId: number;
  open: (topicId: number) => void;
  close: () => void;
}

const useCreatePGKnowForms = create<CreatePGKnowFormsStore>((set) => ({
  isOpen: false,
  topicId:0,
  open: (topicId) => set({ isOpen: true, topicId }),
  close: () => set({ isOpen: false }),
}));

export default useCreatePGKnowForms;
