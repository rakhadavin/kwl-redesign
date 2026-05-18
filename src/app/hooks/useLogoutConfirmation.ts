import { create } from "zustand";

interface LogoutConfirmationStore {
  isOpen: boolean;
  handleNext?: () => void;
  open: (handleNext: () => void) => void;
    // open: (rewardId: number) => void;
  close: () => void;
}

const useLogoutConfirmation = create<LogoutConfirmationStore>((set) => ({
  isOpen: false,
  handleNext: undefined,
  open: (handleNext) => set({ isOpen: true, handleNext }),
// open: (rewardId) => set({ isOpen: true, rewardId }),
  close: () => set({ isOpen: false }),
}));

export default useLogoutConfirmation;