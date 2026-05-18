"use client";

import React from "react";
import MessageModal from "../modals/MessageModal";

import useSuccessCreateKuesioner from "@/app/hooks/useSuccessCreateKuesioner";

const SuccessCreateKuesioner = () => {
  const successCreateKuesioner = useSuccessCreateKuesioner();
  return (
    <div>
      <MessageModal
        message="Quiz Berhasil Disimpan"
        labelButton1="Ok"
        buttonColor1="green-accent"
        isOpen={successCreateKuesioner.isOpen}
        close={successCreateKuesioner.close}
        handleReload={true} 
      />
    </div>
  );
};

export default SuccessCreateKuesioner;
