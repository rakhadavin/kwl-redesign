import { toast } from "sonner";

const useSuccessCreateKnow = () => ({ open: () => toast.success("Pertanyaan Know Berhasil Disimpan") });

export default useSuccessCreateKnow;
