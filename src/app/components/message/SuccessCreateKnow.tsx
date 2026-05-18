"use client";

import React from "react";
import MessageModal from "../modals/MessageModal";

import useSuccessCreateKnow from "@/app/hooks/useSuccessCreateKnow";

const SuccessCreateKnow = () => {
  const successCreateKnow = useSuccessCreateKnow();

  return (
    <div>
      <MessageModal
        message="Pertanyaan Know Berhasil Disimpan"
        labelButton1="Ok"
        buttonColor1="green-accent"
        isOpen={successCreateKnow.isOpen}
        close={successCreateKnow.close}
        handleReload={true}
      />
    </div>
  );
};

export default SuccessCreateKnow;
