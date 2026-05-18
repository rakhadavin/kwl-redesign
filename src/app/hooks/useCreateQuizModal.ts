import { create } from "zustand";

interface CreateQuizModalStore {
    isOpen: boolean;
    // open: () => void;
    // knowId: number | null;
    // wtkId: number | null;
    // learnedId: number | null;
    knowId?: number;
    wtkId?: number;
    learnedId?: number;
    topicId?: number;
    open: (knowId: number, wtkId: number, learnedId: number, topicId:number) => void;
    close: () => void;
  }
  
  const useCreateQuizModal = create<CreateQuizModalStore>((set) => ({
    isOpen: false,
    // knowId: null,
    // wtkId: null,
    // learnedId: null,
    // open: () => set({ isOpen: true }),
    open: (knowId, wtkId, learnedId, topicId) => set({ isOpen: true, knowId, wtkId, learnedId, topicId }),
    close: () => set({ isOpen: false }),
  }));

export default useCreateQuizModal;