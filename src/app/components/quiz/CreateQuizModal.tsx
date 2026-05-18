"use client";

import React from "react";
import QuizModal from "../modals/QuizModal";

import useCreateQuizModal from "@/app/hooks/useCreateQuizModal";

const CreateQuizModal = () => {
  const createQuizModal = useCreateQuizModal();

  return (
    <div>
      <QuizModal
        messageHeader="Buat Pertanyaan"
        message="Tambahkan Pertanyaan Untuk Topik Ini"
        label1="Know"
        imageFile1="know"
        next1="know"
        label2="Want to Know"
        imageFile2="wtk"
        next2="wtk"
        label3="Learned"
        imageFile3="learned"
        next3="learned"
        cls="quiz modal"
        isOpen={createQuizModal.isOpen}
        close={createQuizModal.close}
        knowId={createQuizModal.knowId}
        wtkId={createQuizModal.wtkId}
        learnedId={createQuizModal.learnedId}
        topicId={createQuizModal.topicId}
        // selectedTopic={createQuizModal.selectedTopic}
      />
    </div>
  );
};

export default CreateQuizModal;
