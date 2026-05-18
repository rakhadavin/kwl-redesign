"use client";

import React from "react";
import MessageModal from "../modals/MessageModal";

import useSuccessCreateTopic from "@/app/hooks/useSuccessCreateTopic";

const SuccessCreateTopic = () => {
  const successCreateTopic = useSuccessCreateTopic();

  return (
    <div>
      <MessageModal
        message="Topic Berhasil Disimpan"
        labelButton1="Ok"
        buttonColor1="green-accent"
        isOpen={successCreateTopic.isOpen}
        close={successCreateTopic.close}
        handleReload={true}
      />
    </div>
  );
};

export default SuccessCreateTopic;
