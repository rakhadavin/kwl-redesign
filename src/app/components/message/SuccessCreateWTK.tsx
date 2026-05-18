"use client";

import React from "react";
import MessageModal from "../modals/MessageModal";

import useSuccessCreateWTK from "@/app/hooks/useSuccessCreateWTK";

const SuccessCreateWTK = () => {
  const successCreateWTK = useSuccessCreateWTK();

  return (
    <div>
      <MessageModal
        message="Pertanyaan Want to Know Berhasil Disimpan"
        labelButton1="Ok"
        buttonColor1="green-accent"
        isOpen={successCreateWTK.isOpen}
        close={successCreateWTK.close}
        handleReload={true}
      />
    </div>
  );
};

export default SuccessCreateWTK;
