import { create } from "zustand";

interface QuizProgressStore {
  total: number;
  current: number;
  progress: (current?: number, total?: number) => void;
  submit: () => void;
}

const useQuizProgress = create<QuizProgressStore>((set) => ({
  total: 0,
  current: 0,
  progress: (current?: number, total?: number) => set(() => ({ current: current, total: total })),
  submit: () => set({ current: 0, total: 0 }),
}));

export default useQuizProgress;
