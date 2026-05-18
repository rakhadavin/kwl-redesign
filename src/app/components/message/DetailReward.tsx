"use client";

import React from "react";
import MessageModal from "../modals/MessageModal";

import useDetailReward from "@/app/hooks/useDetailReward";

const DetailReward = () => {
  const detailReward = useDetailReward();
  return (
    <div>
      <MessageModal
        message={detailReward.detailReward}
        labelButton1="selesai"
        buttonColor1="green-accent"
        isOpen={detailReward.isOpen}
        close={detailReward.close}
      />
    </div>
  );
};

export default DetailReward;
