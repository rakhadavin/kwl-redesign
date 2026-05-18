import { create } from "zustand";

interface EnrolConfirmationStore {
  isOpen: boolean;
  handleNext?: () => void;
  open: (handleNext: () => void) => void;
    // open: (topicId: number) => void;
  close: () => void;
}

const useEnrolConfirmation = create<EnrolConfirmationStore>((set) => ({
  isOpen: false,
  open: (handleNext) => set({ isOpen: true, handleNext }),
// open: (topicId) => set({ isOpen: true, topicId }),
  close: () => set({ isOpen: false }),
}));

export default useEnrolConfirmation;