"use client";

import React from "react";
import MessageModal from "../modals/MessageModal";

import useSuccessHideTopic from "@/app/hooks/useSuccessHideTopic";
import useSuccessArchiveTopic from "@/app/hooks/useSuccessArchiveTopic";

const SuccessArchiveTopic = () => {
  const successArchiveTopic = useSuccessArchiveTopic();
  return (
    <div>
      <MessageModal
        message={`Topic Berhasil ${successArchiveTopic.isArchived ? "Diarsipkan" : "Ditampilkan"}!`}
        labelButton1="Ok"
        buttonColor1="green-accent"
        isOpen={successArchiveTopic.isOpen}
        close={successArchiveTopic.close}
        handleReload={true}
      />
    </div>
  );
};

export default SuccessArchiveTopic;
