"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import WidthButton from "../button/WidthButton";

// import useCreateEssayKnowForms from "@/app/hooks/useCreateEssayKnowForms";
// import useSuccessCreateKnow from "@/app/hooks/useSuccessCreateKnow";

type FormValues = {
  question: string;
  score: number;
};

interface EssayContentProps {
  handleBack: () => void;
  handleNext: () => void;
  topicId?: number;
}

const EssayContent: React.FC<EssayContentProps> = ({
  handleBack,
  handleNext,
  topicId,
}) => {
  //   const createEssayKnowForms = useCreateEssayKnowForms();
  //   const successCreateKnow = useSuccessCreateKnow();

  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    const postData = {
      ...data,
      type: "reflection",
      topic_id: topicId,
    };
    fetch("http://127.0.0.1:8000/api/know/essay/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response from API:", data);
        // Lakukan apa pun yang perlu dilakukan setelah mendapatkan respons dari API
        handleNext();
        // preReadingMaterialForms.open(); // Buka modal sukses
        // createCheckboxWTKForms.close(); // Tutup modal formulir
      })
      .catch((error) => {
        console.error("There was an error with the POST request:", error);
        // Tambahkan penanganan kesalahan di sini, misalnya menampilkan pesan kesalahan kepada pengguna
      });
    // onSubmit(data); // Lakukan apa pun yang Anda perlukan dengan data formulir di sini
    // successCreateKnow.open();
    // createEssayKnowForms.close();
    // handleNext();
  };

  return (
    <div>
      <p className="text-main font-semibold font-sm py-2">Detail Soal</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="question" className="text-xs font-bold">
            Pertanyaan
          </label>
          <input
            id="question"
            {...register("question", {
              required: { value: true, message: "pertanyaan harus diisi" },
            })}
            type="text"
            className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm "
          />
          <p className="error">{errors.question?.message}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="score" className="text-xs font-bold">
            Poin
          </label>
          <input
            id="score"
            {...register("score", {
              required: { value: true, message: "poin harus diisi" },
              pattern: {
                value: /^[0-9]*$/,
                message: "poin harus berupa angka",
              },
            })}
            type="text"
            className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm "
          />
          <p className="error">{errors.score?.message}</p>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="mb-10 w-32 h-7 h-[30px] rounded rounded-md bg-dark-accent border-2 border-dark-accent hover:bg-transparent hover:text-dark-accent hover:border-dark-accent text-white font-bold text-xs py-2 px-2"
            onClick={handleSubmit(handleBack)}
          >
            sebelumnya
          </button>
          <button
            type="submit"
            className="mb-10 w-32 h-7 h-[30px] rounded rounded-md bg-green-accent border-2 border-green-accent hover:bg-transparent hover:text-green-accent hover:border-green-accent text-white font-bold text-xs py-2 px-2"
            onClick={handleSubmit(onSubmit)}
          >
            simpan
          </button>
        </div>
        {/* <WidthButton
          label1="sebelumnya"
          label2="simpan"
          handleBack={handleBack}
          handleNext={handleSave}
          // next1="chooseKnowType"
          // next2="successCreateKnow"
          // close="createEssayKnowForms"
        /> */}
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default EssayContent;
