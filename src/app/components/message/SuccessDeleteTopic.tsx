"use client";

import React from "react";
import MessageModal from "../modals/MessageModal";

import useSuccessDeleteTopic from "@/app/hooks/useSuccessDeleteTopic";

const SuccessDeleteTopic = () => {
  const successDeleteTopic = useSuccessDeleteTopic();
  return (
    <div>
      <MessageModal
        message="Topic Berhasil Dihapus"
        labelButton1="Ok"
        buttonColor1="green-accent"
        isOpen={successDeleteTopic.isOpen}
        close={successDeleteTopic.close}
        handleReload={true}
      />
    </div>
  );
};

export default SuccessDeleteTopic;
