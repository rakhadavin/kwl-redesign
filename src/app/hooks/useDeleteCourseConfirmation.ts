import { create } from "zustand";

interface DeleteCourseConfirmationStore {
  isOpen: boolean;
  courseId?: number;
  handleNext?: () => void;
  open: (courseId: number, handleNext: () => void) => void;
  close: () => void;
}

const useDeleteCourseConfirmation = create<DeleteCourseConfirmationStore>((set) => ({
  isOpen: false,
  open: (courseId, handleNext) => set({ isOpen: true, courseId, handleNext }),
  close: () => set({ isOpen: false }),
}));

export default useDeleteCourseConfirmation;