"use client";

import React from "react";
import MessageModal from "../modals/MessageModal";

import useSuccessCreateCourse from "@/app/hooks/useSuccessCreateCourse";

const SuccessCreateCourse = () => {
  const successCreateCourse = useSuccessCreateCourse();
  return (
    <div>
      {/* <MessageModal
        messageHeader="Selamat!"
        message="course berhasil dibuat"
        imageFile="message"
        width={160}
        height={58}
        buttonText1="ke halaman course"
        buttonColor1="green-accent"
        isOpen={successCreateCourse.isOpen}
        close={successCreateCourse.close}
        msgmodal="course"
      /> */}
      <MessageModal
        message="Course Berhasil Disimpan"
        labelButton1="Ok"
        buttonColor1="green-accent"
        isOpen={successCreateCourse.isOpen}
        close={successCreateCourse.close}
        handleReload={true}
      />
    </div>
  );
};

export default SuccessCreateCourse;
