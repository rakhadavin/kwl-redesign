"use client";

import React from "react";
import MessageModal from "../modals/MessageModal";

import useUnenrolConfirmation from "@/app/hooks/useUnenrolConfirmation";

const UnenrolConfirmation = () => {
  const unenrolConfirmation = useUnenrolConfirmation();
  return (
    <div>
      <MessageModal
        message="Apakah kamu yakin ingin unenrol course ini?"
        labelButton1="tidak"
        buttonColor1="yellow-accent"
        labelButton2="ya"
        buttonColor2="green-accent"
        isOpen={unenrolConfirmation.isOpen}
        close={unenrolConfirmation.close}
        handleNext={unenrolConfirmation.handleNext}
      />
    </div>
  );
};

export default UnenrolConfirmation;
