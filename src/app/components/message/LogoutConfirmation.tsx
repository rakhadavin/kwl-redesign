"use client";

import React from "react";
import MessageModal from "../modals/MessageModal";

import useLogoutConfirmation from "@/app/hooks/useLogoutConfirmation";

const LogoutConfirmation = () => {
  const logoutConfirmation = useLogoutConfirmation();
  return (
    <div>
      <MessageModal
        message="Apakah kamu yakin ingin logout?"
        labelButton1="Tidak"
        buttonColor1="yellow-accent"
        labelButton2="Ya"
        buttonColor2="green-accent"
        isOpen={logoutConfirmation.isOpen}
        close={logoutConfirmation.close}
        handleNext={logoutConfirmation.handleNext}
      />
    </div>
  );
};

export default LogoutConfirmation;
