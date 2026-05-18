import { create } from "zustand";

interface UnenrolConfirmationStore {
  isOpen: boolean;
  topicId?: number;
  handleNext?: () => void;
  open: (handleNext: () => void) => void;
    // open: (topicId: number) => void;
  close: () => void;
}

const useUnenrolConfirmation = create<UnenrolConfirmationStore>((set) => ({
  isOpen: false,
  open: (handleNext) => set({ isOpen: true, handleNext }),
// open: (topicId) => set({ isOpen: true, topicId }),
  close: () => set({ isOpen: false }),
}));

export default useUnenrolConfirmation;