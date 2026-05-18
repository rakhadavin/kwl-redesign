"use client";

import React from "react";
import MessageModal from "../modals/MessageModal";

import useSuccessCreateLearned from "@/app/hooks/useSuccessCreateLearned";

const SuccessCreateLearned = () => {
  const successCreateLearned = useSuccessCreateLearned();

  return (
    <div>
      <MessageModal
        message="Pertanyaan Learned Berhasil Disimpan"
        labelButton1="Ok"
        buttonColor1="green-accent"
        isOpen={successCreateLearned.isOpen}
        close={successCreateLearned.close}
        handleReload={true}
      />
    </div>
  );
};

export default SuccessCreateLearned;
