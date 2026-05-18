import { create } from "zustand";

interface DetailRewardStore {
  isOpen: boolean;
  rewardId: number;
  detailReward: string;
  open: (rewardId: number, detailReward: string) => void;
  close: () => void;
}

const useDetailReward = create<DetailRewardStore>((set) => ({
  isOpen: false,
  rewardId:0,
  detailReward: '',
  open: (rewardId, detailReward) => set({ isOpen: true, rewardId, detailReward }),
  close: () => set({ isOpen: false }),
}));

export default useDetailReward;
