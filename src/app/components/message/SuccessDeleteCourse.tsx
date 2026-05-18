"use client";

import React from "react";
import MessageModal from "../modals/MessageModal";

import useSuccessDeleteCourse from "@/app/hooks/useSuccessDeleteCourse";

const SuccessDeleteCourse = () => {
  const successDeleteCourse = useSuccessDeleteCourse();
  return (
    <div>
      <MessageModal
        message="Course Berhasil Dihapus"
        labelButton1="Ok"
        buttonColor1="green-accent"
        isOpen={successDeleteCourse.isOpen}
        close={successDeleteCourse.close}
        handleReload={true}
      />
    </div>
  );
};

export default SuccessDeleteCourse;
