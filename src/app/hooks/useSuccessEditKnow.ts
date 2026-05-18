import { toast } from "sonner";

const useSuccessEditKnow = () => ({ open: () => toast.success("Pertanyaan Know Berhasil Diubah") });

export default useSuccessEditKnow;
