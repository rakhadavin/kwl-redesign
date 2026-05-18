import { create } from "zustand";

interface CreateCourse2FormsStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useCreateCourse2Forms = create<CreateCourse2FormsStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useCreateCourse2Forms;
