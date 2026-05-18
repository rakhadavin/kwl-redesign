import { create } from "zustand";

interface ArchiveTopicConfirmationStore {
  isOpen: boolean;
  topicId?: number;
  isArchived?: boolean;
  handleNext?: () => void;
  open: (topicId: number, isArchived: boolean, handleNext: () => void) => void;
  close: () => void;
}

const useArchiveTopicConfirmation = create<ArchiveTopicConfirmationStore>((set) => ({
  isOpen: false,
  open: (topicId, isArchived, handleNext) => set({ isOpen: true, isArchived, topicId, handleNext }),
  close: () => set({ isOpen: false }),
}));

export default useArchiveTopicConfirmation;