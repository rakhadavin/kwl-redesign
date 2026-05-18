import { toast } from "sonner";

const useSuccessDeleteTopic = () => ({ open: () => toast.success("Topic Berhasil Dihapus") });

export default useSuccessDeleteTopic;
