import { toast } from "sonner";

const useSuccessCreateCourse = () => ({ open: () => toast.success("Course Berhasil Disimpan") });

export default useSuccessCreateCourse;
