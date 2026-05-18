import { toast } from "sonner";

const useSuccessDeleteReward = () => ({ open: () => toast.success("Reward Berhasil Dihapus") });

export default useSuccessDeleteReward;
