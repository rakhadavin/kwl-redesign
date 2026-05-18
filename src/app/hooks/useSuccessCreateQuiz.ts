import { toast } from "sonner";

const useSuccessCreateQuiz = () => ({ open: () => toast.success("Quiz Berhasil Disimpan") });

export default useSuccessCreateQuiz;
