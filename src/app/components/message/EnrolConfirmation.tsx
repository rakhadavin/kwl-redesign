"use client";

import React from "react";
import MessageModal from "../modals/MessageModal";

import useEnrolConfirmation from "@/app/hooks/useEnrolConfirmation";

const EnrolConfirmation = () => {
  const enrolConfirmation = useEnrolConfirmation();
  return (
    <div>
      <MessageModal
        message="Apakah kamu yakin ingin enrol course ini?"
        labelButton1="tidak"
        buttonColor1="yellow-accent"
        labelButton2="ya"
        buttonColor2="green-accent"
        isOpen={enrolConfirmation.isOpen}
        close={enrolConfirmation.close}
        handleNext={enrolConfirmation.handleNext}
      />
    </div>
  );
};

export default EnrolConfirmation;
