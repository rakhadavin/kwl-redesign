import React from "react";
import MessageModal from "../modals/MessageModal";

import useSuccessEditCourse from "@/app/hooks/useSuccessEditCourse";

const SuccessEditCourse = () => {
  const successEditCourse = useSuccessEditCourse();
  return (
    <div>
      <MessageModal
        message="Course Berhasil Disimpan"
        labelButton1="Ok"
        buttonColor1="green-accent"
        isOpen={successEditCourse.isOpen}
        close={successEditCourse.close}
      />
    </div>
  );
};

export default SuccessEditCourse;
