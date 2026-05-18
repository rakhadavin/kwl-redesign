import React from "react";
import MessageModal from "../modals/MessageModal";

import useSuccessUnenrolCourse from "@/app/hooks/useSuccessUnenrolCourse";

const SuccessUnenrolCourse = () => {
  const successUnenrolCourse = useSuccessUnenrolCourse();
  return (
    <div>
      <MessageModal
        message="Unenrolment berhasil"
        labelButton1="Ok"
        buttonColor1="green-accent"
        isOpen={successUnenrolCourse.isOpen}
        close={successUnenrolCourse.close}
        handleReload={true}
      />
    </div>
  );
};

export default SuccessUnenrolCourse;
