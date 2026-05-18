import { create } from "zustand";

interface CreateQuizQuestionFormsStore {
    isOpen: boolean;
    quizId?: string;
    open: (quizId: string) => void;
    close: () => void;
}

const useCreateQuizQuestionForms = create<CreateQuizQuestionFormsStore>((set) => ({
    isOpen: false,
    quizId: "",
    open: (quizId) => set({ isOpen: true, quizId }),
    close: () => set({ isOpen: false })
}));

export default useCreateQuizQuestionForms;