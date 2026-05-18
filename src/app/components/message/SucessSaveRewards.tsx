"use client";

import React from "react";
import MessageModal from "../modals/MessageModal";

import useSuccessSaveRewards from "@/app/hooks/useSuccessSaveRewards";

const SuccessSaveRewards = () => {
  const successSaveRewards = useSuccessSaveRewards();
  return (
    <div>
      <MessageModal
        message="Reward Berhasil Disimpan"
        labelButton1="Ok"
        buttonColor1="green-accent"
        isOpen={successSaveRewards.isOpen}
        close={successSaveRewards.close}
        handleReload={true}
      />
    </div>
  );
};

export default SuccessSaveRewards;
