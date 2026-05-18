import { create } from "zustand";

interface CreateCheckboxWTKFormsStore {
  isOpen: boolean;
  topicId: number;
  open: (topicId: number) => void;
  close: () => void;
}

const useCreateCheckboxWTKForms = create<CreateCheckboxWTKFormsStore>((set) => ({
  isOpen: false,
  topicId: 0,
  open: (topicId) => set({ isOpen: true, topicId }),
  close: () => set({ isOpen: false }),
}));

export default useCreateCheckboxWTKForms;
