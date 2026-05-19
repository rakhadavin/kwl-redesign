"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Modal from "../modals/Modal";
import EssayContent from "./EssayContent";
import { usePostAuth } from "@/app/lib/api/useAuth";

import useCreateEssayKnowForms from "@/app/hooks/useCreateEssayKnowForms";
import useSuccessCreateKnow from "@/app/hooks/useSuccessCreateKnow";
import useChooseKnowType from "@/app/hooks/useChooseKnowType";

type FormValues = {
  question: string;
  score: number;
};

const CreateEssayKnowForms = () => {
  const createEssayKnowForms = useCreateEssayKnowForms();
  const successCreateKnow = useSuccessCreateKnow();
  const chooseKnowType = useChooseKnowType();

  const handleBack = () => {
    createEssayKnowForms.close();
    chooseKnowType.open(createEssayKnowForms.topicId);
  };

  const handleNext = () => {
    successCreateKnow.open();
    createEssayKnowForms.close();
  };

  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const { mutate, isSuccess } = usePostAuth("/api/know/essay", "lecturer");

  const onSubmit = (data: FormValues) => {
    const postData = {
      ...data,
      type: "reflection",
      topic: createEssayKnowForms.topicId,
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
          <input
            id="question"
            {...register("question", {
              required: { value: true, message: "pertanyaan harus diisi" },
              maxLength: {
                value: 1000,
                message: "pertanyaan maksimal 1000 karakter",
              },
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
        label="Buat Pertanyaan Know"
        content={content}
        isOpen={createEssayKnowForms.isOpen}
        close={createEssayKnowForms.close}
      />
    </div>
  );
};

export default CreateEssayKnowForms;
