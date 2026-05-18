import { toast } from "sonner";

const useSuccessEditTopic = () => ({ open: () => toast.success("Topic Berhasil Diubah") });

export default useSuccessEditTopic;
