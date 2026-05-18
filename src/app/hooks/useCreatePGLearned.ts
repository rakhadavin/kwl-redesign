import { create } from "zustand";

interface CreatePGLearnedFormsStore {
  isOpen: boolean;
  topicId: number;
  open: (topicId: number) => void;
  close: () => void;
}

const useCreatePGLearnedForms = create<CreatePGLearnedFormsStore>((set) => ({
  isOpen: false,
  topicId:0,
  open: (topicId) => set({ isOpen: true, topicId }),
  close: () => set({ isOpen: false }),
}));

export default useCreatePGLearnedForms;
