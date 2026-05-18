import { create } from "zustand";

interface CreateCourseFormsStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useCreateCourseForms = create<CreateCourseFormsStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}));

export default useCreateCourseForms;