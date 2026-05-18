import { toast } from "sonner";

const useSuccessCreateKuesioner = () => ({ open: () => toast.success("Quiz Berhasil Disimpan") });

export default useSuccessCreateKuesioner;
