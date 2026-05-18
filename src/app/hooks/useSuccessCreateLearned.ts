import { toast } from "sonner";

const useSuccessCreateLearned = () => ({ open: () => toast.success("Pertanyaan Learned Berhasil Disimpan") });

export default useSuccessCreateLearned;
