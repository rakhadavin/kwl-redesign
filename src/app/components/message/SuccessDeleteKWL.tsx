"use client";

import React from "react";
import MessageModal from "../modals/MessageModal";

import useSuccessDeleteKWL from "@/app/hooks/useSuccessDeleteKWL";

const SuccessDeleteKWL = () => {
  const successDeleteKWL = useSuccessDeleteKWL();
  return (
    <div>
      <MessageModal
        message="Pertanyaan Berhasil Dihapus."
        labelButton1="Ok"
        buttonColor1="green-accent"
        isOpen={successDeleteKWL.isOpen}
        close={successDeleteKWL.close}
        handleReload={true}
      />
    </div>
  );
};

export default SuccessDeleteKWL;
