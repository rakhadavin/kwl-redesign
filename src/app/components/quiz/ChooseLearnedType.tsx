"use client";

import React from "react";
import QuizModal from "../modals/QuizModal";

import useChooseLearnedType from "@/app/hooks/useChooseLearnedType";

const ChooseLearnedType = () => {
  const chooseLearnedType = useChooseLearnedType();

  return (
    <div>
      <QuizModal
        messageHeader="Pilih Jenis Soal"
        message="jenis soal apa yang ingin Anda tambahkan?"
        label1="Pilihan Ganda"
        sublabel1="terdapat pilihan opsi jawaban"
        imageFile1="pg"
        next1="createPGLearnedForms"
        label2="Refleksi"
        sublabel2="jawaban berupa open question"
        imageFile2="refleksi"
        next2="createEssayLearnedForms"
        cls="learned"
        isOpen={chooseLearnedType.isOpen}
        close={chooseLearnedType.close}
        topicId={chooseLearnedType.topicId}
      />
    </div>
  );
};

export default ChooseLearnedType;
