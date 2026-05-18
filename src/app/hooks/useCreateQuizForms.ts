import { create } from "zustand";

interface CreateQuizFormsStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useCreateQuizForms = create<CreateQuizFormsStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}));

export default useCreateQuizForms;