import { create } from "zustand";

interface AddRewardsFormsStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAddRewardsForms = create<AddRewardsFormsStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}));

export default useAddRewardsForms;