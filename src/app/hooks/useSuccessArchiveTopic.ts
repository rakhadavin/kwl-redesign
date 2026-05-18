import { toast } from "sonner";

const useSuccessArchiveTopic = () => ({
  open: (isArchived: boolean) =>
    toast.success(isArchived ? "Topic Berhasil Diarsipkan!" : "Topic Berhasil Ditampilkan!"),
});

export default useSuccessArchiveTopic;
