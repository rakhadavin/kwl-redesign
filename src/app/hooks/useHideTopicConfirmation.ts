import { create } from "zustand";

interface HideTopicConfirmationStore {
  isOpen: boolean;
  topicId?: number;
  isHidden?: boolean;
  handleNext?: () => void;
  open: (topicId: number, isHidden: boolean, handleNext: () => void) => void;
  close: () => void;
}

const useHideTopicConfirmation = create<HideTopicConfirmationStore>((set) => ({
  isOpen: false,
  open: (topicId, isHidden, handleNext) => set({ isOpen: true, isHidden, topicId, handleNext }),
  close: () => set({ isOpen: false }),
}));

export default useHideTopicConfirmation;