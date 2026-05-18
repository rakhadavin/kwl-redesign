"use client";

import React from "react";
import QuizModal from "../modals/QuizModal";

import useChooseKnowType from "@/app/hooks/useChooseKnowType";

const ChooseKnowType = () => {
  const chooseKnowType = useChooseKnowType();

  return (
    <div>
      <QuizModal
        messageHeader="Pilih Jenis Soal"
        message="jenis soal apa yang ingin Anda tambahkan?"
        label1="Pilihan Ganda"
        sublabel1="terdapat pilihan opsi jawaban"
        imageFile1="pg"
        next1="createPGKnowForms"
        label2="Refleksi"
        sublabel2="jawaban berupa open question"
        imageFile2="refleksi"
        next2="createEssayKnowForms"
        cls="know"
        isOpen={chooseKnowType.isOpen}
        close={chooseKnowType.close}
        topicId={chooseKnowType.topicId}
      />
    </div>
  );
};

export default ChooseKnowType;
