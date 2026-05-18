import React from "react";
import MessageModal from "../modals/MessageModal";

import useSuccessEnrolCourse from "@/app/hooks/useSuccessEnrolCourse";

const SuccessEnrolCourse = () => {
  const successEnrolCourse = useSuccessEnrolCourse();
  return (
    <div>
      <MessageModal
        message="Enrolment berhasil. Selamat belajar!"
        labelButton1="Ok"
        buttonColor1="green-accent"
        isOpen={successEnrolCourse.isOpen}
        close={successEnrolCourse.close}
        handleReload={true}
      />
    </div>
  );
};

export default SuccessEnrolCourse;
