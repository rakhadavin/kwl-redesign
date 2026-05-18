"use client";

import React from "react";
import MessageModal from "../modals/MessageModal";

import useSuccessDeleteReward from "@/app/hooks/useSuccessDeleteReward";

const SuccessDeleteReward = () => {
  const successDeleteReward = useSuccessDeleteReward();
  return (
    <div>
      <MessageModal
        message="Reward Berhasil Dihapus"
        labelButton1="Ok"
        buttonColor1="green-accent"
        isOpen={successDeleteReward.isOpen}
        close={successDeleteReward.close}
        handleReload={true}
      />
    </div>
  );
};

export default SuccessDeleteReward;
