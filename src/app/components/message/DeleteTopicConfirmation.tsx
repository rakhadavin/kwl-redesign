import React from "react";
import MessageModal from "../modals/MessageModal";

import useDeleteTopicConfirmation from "@/app/hooks/useDeleteTopicConfirmation";

const DeleteTopicConfirmation = () => {
  const deleteTopicConfirmation = useDeleteTopicConfirmation();
  return (
    <div>
      <MessageModal
        message="Apakah kamu yakin ingin menghapus Topic?"
        labelButton1="Tidak"
        buttonColor1="yellow-accent"
        labelButton2="Ya"
        buttonColor2="green-accent"
        isOpen={deleteTopicConfirmation.isOpen}
        close={deleteTopicConfirmation.close}
        handleNext={deleteTopicConfirmation.handleNext}
      />
    </div>
  );
};

export default DeleteTopicConfirmation;
