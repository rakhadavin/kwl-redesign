import React from "react";
import MessageModal from "../modals/MessageModal";

import useArchiveTopicConfirmation from "@/app/hooks/useArchiveTopicConfirmation";

const ArchiveTopicConfirmation = () => {
  const archiveTopicConfirmation = useArchiveTopicConfirmation();
  return (
    <div>
      <MessageModal
        message={`Apakah kamu yakin ingin ${archiveTopicConfirmation.isArchived ?  "menampilkan" : "mengarsipkan"} Topic?`}
        labelButton1="Tidak"
        buttonColor1="yellow-accent"
        labelButton2="Ya"
        buttonColor2="green-accent"
        isOpen={archiveTopicConfirmation.isOpen}
        close={archiveTopicConfirmation.close}
        handleNext={archiveTopicConfirmation.handleNext}
      />
    </div>
  );
};

export default ArchiveTopicConfirmation;
