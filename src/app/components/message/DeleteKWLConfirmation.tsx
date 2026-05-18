import React from "react";
import MessageModal from "../modals/MessageModal";

import useDeleteKWLConfirmation from "@/app/hooks/useDeleteKWLConfirmation";

const DeleteKWLConfirmation = () => {
  const deleteKWLConfirmation = useDeleteKWLConfirmation();
  return (
    <div>
      <MessageModal
        message="Apakah kamu yakin ingin menghapus Pertanyaan?"
        labelButton1="Tidak"
        buttonColor1="yellow-accent"
        labelButton2="Ya"
        buttonColor2="green-accent"
        isOpen={deleteKWLConfirmation.isOpen}
        close={deleteKWLConfirmation.close}
        handleNext={deleteKWLConfirmation.handleNext}
      />
    </div>
  );
};

export default DeleteKWLConfirmation;
