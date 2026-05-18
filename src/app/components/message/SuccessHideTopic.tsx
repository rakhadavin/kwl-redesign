"use client";

import React from "react";
import MessageModal from "../modals/MessageModal";

import useSuccessHideTopic from "@/app/hooks/useSuccessHideTopic";

const SuccessHideTopic = () => {
  const successHideTopic = useSuccessHideTopic();
  return (
    <div>
      <MessageModal
        message={`Topic Berhasil ${successHideTopic.isHidden ? "Disembunyikan" : "Ditampilkan"}!`}
        labelButton1="Ok"
        buttonColor1="green-accent"
        isOpen={successHideTopic.isOpen}
        close={successHideTopic.close}
        handleReload={true}
      />
    </div>
  );
};

export default SuccessHideTopic;
