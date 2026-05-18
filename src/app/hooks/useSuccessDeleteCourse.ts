import { toast } from "sonner";

const useSuccessDeleteCourse = () => ({ open: () => toast.success("Course Berhasil Dihapus") });

export default useSuccessDeleteCourse;
