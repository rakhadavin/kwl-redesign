import { create } from "zustand";

interface SuccessEnrolCourseStore {
  isOpen: boolean;
  courseId?: number;
  open: (courseId: number) => void;
  close: () => void;
}

const useSuccessEnrolCourse = create<SuccessEnrolCourseStore>((set) => ({
  isOpen: false,
  open: (courseId) => set({ isOpen: true, courseId }),
  close: () => set({ isOpen: false }),
}));

export default useSuccessEnrolCourse;
