import { toast } from "sonner";

const useSuccessUnenrolCourse = () => ({ open: () => toast.success("Unenrolment berhasil") });

export default useSuccessUnenrolCourse;
