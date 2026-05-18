import { toast } from "sonner";

const useSuccessDeleteKWL = () => ({ open: () => toast.success("Pertanyaan Berhasil Dihapus") });

export default useSuccessDeleteKWL;
