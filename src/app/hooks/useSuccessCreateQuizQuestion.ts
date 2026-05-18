import { toast } from "sonner";

const useSuccessCreateQuizQuestion = () => ({ open: () => toast.success("Question Berhasil Disimpan") });

export default useSuccessCreateQuizQuestion;
