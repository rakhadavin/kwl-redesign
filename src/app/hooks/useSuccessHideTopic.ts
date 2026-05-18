import { toast } from "sonner";

const useSuccessHideTopic = () => ({
  open: (isHidden: boolean) =>
    toast.success(isHidden ? "Topic Berhasil Disembunyikan!" : "Topic Berhasil Ditampilkan!"),
});

export default useSuccessHideTopic;
