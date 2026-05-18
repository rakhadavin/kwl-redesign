import { toast } from "sonner";

const useSuccessCreateTopic = () => ({ open: () => toast.success("Topic Berhasil Disimpan") });

export default useSuccessCreateTopic;
