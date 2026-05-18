// import { create } from "zustand";

// interface DeleteKWLConfirmationStore {
//   isOpen: boolean;
//   topicId?: number;
//   open: (topicId: number) => void;
//   close: () => void;
// }

// const useDeleteKWLConfirmation = create<DeleteKWLConfirmationStore>((set) => ({
//   isOpen: false,
//   open: (topicId) => set({ isOpen: true, topicId }),
//   close: () => set({ isOpen: false }),
// }));

// export default useDeleteKWLConfirmation;



import { create } from "zustand";

interface DeleteKWLConfirmationStore {
  isOpen: boolean;
  topicId?: number;
  handleNext?: () => void;
  open: (topicId: number, handleNext: () => void) => void;
    // open: (topicId: number) => void;
  close: () => void;
}

const useDeleteKWLConfirmation = create<DeleteKWLConfirmationStore>((set) => ({
  isOpen: false,
  open: (topicId, handleNext) => set({ isOpen: true, topicId, handleNext }),
// open: (topicId) => set({ isOpen: true, topicId }),
  close: () => set({ isOpen: false }),
}));

export default useDeleteKWLConfirmation;
