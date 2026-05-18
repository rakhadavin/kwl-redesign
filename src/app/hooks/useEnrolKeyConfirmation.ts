import { create } from "zustand";

interface EnrolKeyConfirmationStore {
  isOpen: boolean;
  courseId?: number;
  studentId?: number;
  open: (courseId: number, studentId: number) => void;
  close: () => void;
}

const useEnrolKeyConfirmation = create<EnrolKeyConfirmationStore>((set) => ({
  isOpen: false,
  open: (courseId: number, studentId: number) => set({ isOpen: true, courseId, studentId }),
  close: () => set({ isOpen: false }),
}));

export default useEnrolKeyConfirmation;