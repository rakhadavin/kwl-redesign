import React from "react";
import MessageModal from "../modals/MessageModal";

import useSuccessEditKnow from "@/app/hooks/useSuccessEditKnow";

const SuccessEditKnow = () => {
  const successEditKnow = useSuccessEditKnow();
  return (
    <div>
      <MessageModal
        message="Course Berhasil Diubah"
        labelButton1="Ok"
        buttonColor1="green-accent"
        isOpen={successEditKnow.isOpen}
        close={successEditKnow.close}
        handleReload={true}
      />
    </div>
  );
};

export default SuccessEditKnow;
