import { toast } from "sonner";

const useSuccessEditCourse = () => ({ open: () => toast.success("Course Berhasil Diubah") });

export default useSuccessEditCourse;
