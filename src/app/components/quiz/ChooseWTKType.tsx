"use client";

import React from "react";
import QuizModal from "../modals/QuizModal";

import useChooseWTKType from "@/app/hooks/useChooseWTKType";

const ChooseWTKType = () => {
  const chooseWTKType = useChooseWTKType();

  return (
    <div>
      <QuizModal
        messageHeader="Pilih Jenis Soal"
        message="jenis soal apa yang ingin Anda tambahkan?"
        label1="Checkbox"
        sublabel1="terdapat pilihan opsi jawaban"
        imageFile1="checkbox"
        next1="createCheckboxWTKForms"
        label2="Essay"
        sublabel2="jawaban berupa open question"
        imageFile2="refleksi"
        next2="createEssayWTKForms"
        cls="wtk"
        isOpen={chooseWTKType.isOpen}
        close={chooseWTKType.close}
        topicId={chooseWTKType.topicId}
      />
    </div>
  );
};

export default ChooseWTKType;
