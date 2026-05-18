import { toast } from "sonner";

const useSuccessEnrolCourse = () => ({ open: () => toast.success("Enrolment berhasil. Selamat belajar!") });

export default useSuccessEnrolCourse;
