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

interface EditRewardFormsStore {
  isOpen: boolean;
  rewardId?: number;
  open: (rewardId: number) => void;
    // open: (rewardId: number) => void;
  close: () => void;
}

const useEditRewardForms = create<EditRewardFormsStore>((set) => ({
  isOpen: false,
  open: (rewardId) => set({ isOpen: true, rewardId }),
// open: (rewardId) => set({ isOpen: true, rewardId }),
  close: () => set({ isOpen: false }),
}));

export default useEditRewardForms;
