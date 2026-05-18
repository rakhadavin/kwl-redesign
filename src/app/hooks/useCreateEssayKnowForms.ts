import { create } from "zustand";

interface CreateEssayKnowFormsStore {
  isOpen: boolean;
  topicId: number;
  open: (topicId: number) => void;
  close: () => void;
}

const useCreateEssayKnowForms = create<CreateEssayKnowFormsStore>((set) => ({
  isOpen: false,
  topicId:0,
  open: (topicId) => set({ isOpen: true, topicId }),
  close: () => set({ isOpen: false }),
}));

export default useCreateEssayKnowForms;
