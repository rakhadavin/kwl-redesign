"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Modal from "../modals/Modal";
import { usePostAuth } from "@/app/lib/api/useAuth";

import useCreateEssayWTKForms from "@/app/hooks/useCreateEssayWTKForms";
import useSuccessCreateWTK from "@/app/hooks/useSuccessCreateWTK";
import useChooseWTKType from "@/app/hooks/useChooseWTKType";
import usePreReadingMaterialForms from "@/app/hooks/usePreReadingMaterialForms";
import PreReadingMaterialForms from "./PreReadingMaterialForms";

type FormValues = {
  question: string;
  score: number;
};

const CreateEssayWTKForms = () => {
  const createEssayWTKForms = useCreateEssayWTKForms();
  const successCreateWTK = useSuccessCreateWTK();
  const chooseWTKType = useChooseWTKType();
  const preReadingMaterialForms = usePreReadingMaterialForms();

  const handleBack = () => {
    createEssayWTKForms.close();
    chooseWTKType.open(createEssayWTKForms.topicId);
  };

  const handleNext = () => {
    preReadingMaterialForms.open(createEssayWTKForms.topicId);
    createEssayWTKForms.close();
  };

  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const { mutate, isSuccess } = usePostAuth("/api/wtk/essay", "lecturer");

  const onSubmit = (data: FormValues) => {
    const postData = {
      ...data,
      type: "reflection",
      topic: createEssayWTKForms.topicId,
    };
    mutate(
      { body: postData },
      {
        onSuccess: () => {
          handleNext();
        },
      }
    );
  };

  const content = (
    <>
      <p className="text-main font-semibold font-sm py-2">Detail Soal</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="question" className="text-xs font-bold">
            Pertanyaan
          </label>
          <textarea
            id="question"
            {...register("question", {
              required: { value: true, message: "pertanyaan harus diisi" },
              maxLength: {
                value: 1000,
                message: "maksimal 1000 karakter",
              },
            })}
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
        <div className="btn-group flex flex-col">
          <button
            className="mb-1 w-full bg-dark-accent border-2 hover:bg-white hover:text-dark-accent hover:border-dark-accent text-white font-bold text-xs py-2 px-2 rounded-xl"
            onClick={handleSubmit(handleBack)}
          >
            Kembali
          </button>

          <button
            className="mb-1 w-full bg-transparent border-2 border-dark-accent hover:bg-dark-accent hover:text-white text-dark-accent font-bold text-xs py-2 px-2 rounded-xl"
            onClick={handleSubmit(onSubmit)}
          >
            simpan
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );

  return (
    <div>
      <Modal
        label="Buat Pertanyaan Want to Know"
        content={content}
        isOpen={createEssayWTKForms.isOpen}
        close={createEssayWTKForms.close}
      />
    </div>
  );
};

export default CreateEssayWTKForms;
