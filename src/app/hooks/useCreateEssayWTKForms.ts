import { create } from "zustand";

interface CreateEssayWTKFormsStore {
  isOpen: boolean;
  topicId: number;
  open: (topicId: number) => void;
  close: () => void;
}

const useCreateEssayWTKForms = create<CreateEssayWTKFormsStore>((set) => ({
  isOpen: false,
  topicId:0,
  open: (topicId) => set({ isOpen: true, topicId }),
  close: () => set({ isOpen: false }),
}));

export default useCreateEssayWTKForms;
