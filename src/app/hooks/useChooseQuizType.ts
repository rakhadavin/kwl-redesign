import { create } from "zustand";

interface ChooseQuizTypeStore {
  isOpen: boolean;
  quizId?: string;
  open: (quizId: string) => void;
  close: () => void;
}

const useChooseQuizType = create<ChooseQuizTypeStore>((set) => ({
  isOpen: false,
  open: (quizId) => set({ isOpen: true, quizId }),
  close: () => set({ isOpen: false }),
}));

export default useChooseQuizType;
