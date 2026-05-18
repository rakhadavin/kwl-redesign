import React from "react";
import MessageModal from "../modals/MessageModal";

import useHideTopicConfirmation from "@/app/hooks/useHideTopicConfirmation";

const HideTopicConfirmation = () => {
  const hideTopicConfirmation = useHideTopicConfirmation();
  return (
    <div>
      <MessageModal
        message={`Apakah kamu yakin ingin ${hideTopicConfirmation.isHidden ?  "menampilkan" : "menyembunyikan"} Topic?`}
        labelButton1="Tidak"
        buttonColor1="yellow-accent"
        labelButton2="Ya"
        buttonColor2="green-accent"
        isOpen={hideTopicConfirmation.isOpen}
        close={hideTopicConfirmation.close}
        handleNext={hideTopicConfirmation.handleNext}
      />
    </div>
  );
};

export default HideTopicConfirmation;
