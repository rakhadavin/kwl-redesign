import { create } from "zustand";

interface CreateEssayLearnedFormsStore {
  isOpen: boolean;
  topicId: number;
  open: (topicId: number) => void;
  close: () => void;
}

const useCreateEssayLearnedForms = create<CreateEssayLearnedFormsStore>((set) => ({
  isOpen: false,
  topicId:0,
  open: (topicId) => set({ isOpen: true, topicId }),
  close: () => set({ isOpen: false }),
}));

export default useCreateEssayLearnedForms;
