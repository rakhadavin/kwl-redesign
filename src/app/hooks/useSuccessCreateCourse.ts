import { create } from "zustand";

interface SuccessCreateCourseStore {
  isOpen: boolean;
  createdCourseId?: number;
  open: (courseId?: number) => void;
  close: () => void;
}

const useSuccessCreateCourse = create<SuccessCreateCourseStore>((set) => ({
  isOpen: false,
  open: (courseId) =>
    set((state) => ({
      isOpen: true,
      createdCourseId: courseId !== undefined ? courseId : state.createdCourseId,
    })),
  close: () => set({ isOpen: false }),
}));

export default useSuccessCreateCourse;
