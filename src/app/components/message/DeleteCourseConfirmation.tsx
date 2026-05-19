import React from "react";
import MessageModal from "../modals/MessageModal";

import useDeleteCourseConfirmation from "@/app/hooks/useDeleteCourseConfirmation";

const DeleteCourseConfirmation = () => {
  const deleteCourseConfirmation = useDeleteCourseConfirmation();
  return (
    <div>
      <MessageModal
        message="Apakah kamu yakin ingin menghapus Course?"
        labelButton1="Tidak"
        buttonColor1="yellow-accent"
        labelButton2="Ya"
        buttonColor2="green-accent"
        isOpen={deleteCourseConfirmation.isOpen}
        close={deleteCourseConfirmation.close}
        handleNext={deleteCourseConfirmation.handleNext}
      />
    </div>
  );
};

export default DeleteCourseConfirmation;
