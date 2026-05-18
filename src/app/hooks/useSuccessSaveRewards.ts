import { toast } from "sonner";

const useSuccessSaveRewards = () => ({ open: () => toast.success("Reward Berhasil Disimpan") });

export default useSuccessSaveRewards;
