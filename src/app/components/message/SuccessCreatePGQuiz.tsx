"use client";

import React from "react";
import MessageModal from "../modals/MessageModal";

import useSuccessCreateQuizQuestion from "@/app/hooks/useSuccessCreateQuizQuestion";

const SuccessCreatePGQuiz = () => {
  const successCreateQuizQuestion = useSuccessCreateQuizQuestion();
  return (
    <div>
      <MessageModal
        message="Question Berhasil Disimpan"
        labelButton1="Ok"
        buttonColor1="green-accent"
        isOpen={successCreateQuizQuestion.isOpen}
        close={successCreateQuizQuestion.close}
        handleReload={true}
      />
    </div>
  );
};

export default SuccessCreatePGQuiz;
