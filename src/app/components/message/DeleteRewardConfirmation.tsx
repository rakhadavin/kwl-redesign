"use client";

import React from "react";
import MessageModal from "../modals/MessageModal";

import useDeleteRewardConfirmation from "@/app/hooks/useDeleteRewardsConfirmation";

const DeleteRewardConfirmation = () => {
  const deleteRewardConfirmation = useDeleteRewardConfirmation();
  return (
    <div>
      <MessageModal
        message="Hapus Reward?"
        labelButton1="tidak"
        buttonColor1="yellow-accent"
        labelButton2="ya"
        buttonColor2="green-accent"
        isOpen={deleteRewardConfirmation.isOpen}
        close={deleteRewardConfirmation.close}
        handleNext={deleteRewardConfirmation.handleNext}
      />
    </div>
  );
};

export default DeleteRewardConfirmation;
