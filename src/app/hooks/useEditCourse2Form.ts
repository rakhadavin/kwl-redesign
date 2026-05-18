import { create } from "zustand";

interface EditCourse2FormsStore {
  isOpen: boolean;
  topicId: number;
  open: (topicId: number) => void;
  close: () => void;
}

const useEditCourse2Forms = create<EditCourse2FormsStore>((set) => ({
  isOpen: false,
  topicId:0,
  open: (topicId) => set({ isOpen: true, topicId }),
  close: () => set({ isOpen: false }),
}));

export default useEditCourse2Forms;
