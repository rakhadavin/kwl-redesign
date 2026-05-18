import { toast } from "sonner";

const useSuccessEditLearned = () => ({ open: () => toast.success("Pertanyaan Learned Berhasil Diubah") });

export default useSuccessEditLearned;
