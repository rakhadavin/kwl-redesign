import { create } from "zustand";

interface EditCheckboxWTKFormsStore {
  isOpen: boolean;
  topicId: number;
  wtkId: number;
  open: (topicId: number, wtkId: number) => void;
  close: () => void;
}

const useEditCheckboxWTKForms = create<EditCheckboxWTKFormsStore>((set) => ({
  isOpen: false,
  topicId:0,
  wtkId: 0,
  open: (topicId, wtkId) => set({ isOpen: true, topicId, wtkId }),
  close: () => set({ isOpen: false }),
}));

export default useEditCheckboxWTKForms;
