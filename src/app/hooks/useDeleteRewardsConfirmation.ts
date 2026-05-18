// import { create } from "zustand";

// interface DeleteRewardConfirmationStore {
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

interface DeleteRewardConfirmationStore {
  isOpen: boolean;
  rewardId?: number;
  handleNext?: () => void;
  open: (rewardId: number, handleNext: () => void) => void;
    // open: (rewardId: number) => void;
  close: () => void;
}

const useDeleteRewardConfirmation = create<DeleteRewardConfirmationStore>((set) => ({
  isOpen: false,
  open: (rewardId, handleNext) => set({ isOpen: true, rewardId, handleNext }),
// open: (rewardId) => set({ isOpen: true, rewardId }),
  close: () => set({ isOpen: false }),
}));

export default useDeleteRewardConfirmation;
