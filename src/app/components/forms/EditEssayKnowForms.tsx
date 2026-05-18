"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Modal from "../modals/Modal";
import { useGetAuth, useGetAuthWithTopicId, usePutAuth } from "@/app/lib/api/useAuth";

import useEditEssayKnowForms from "@/app/hooks/useEditEssayKnowForms";
import useSuccessCreateKnow from "@/app/hooks/useSuccessCreateKnow";

type FormValues = {
  question: string;
  score: number;
};

const EditEssayKnowForms = () => {
  const editEssayKnowForms = useEditEssayKnowForms();
  const {
    data,
    status,
    isSuccess: success,
  } = useGetAuthWithTopicId(
    `/api/know/essay/`,
    "prev essay know", editEssayKnowForms.topicId
  );

  // if (status === "pending") {
  //   return <div>Loading...</div>;
  // }
  if (status === "success") {
    return <EditEssayKnowFormsChild essay={data} />;
  }
};

const EditEssayKnowFormsChild = ({ essay }: any) => {
  const editEssayKnowForms = useEditEssayKnowForms();
  const successCreateKnow = useSuccessCreateKnow();

  const handleNext = () => {
    successCreateKnow.open();
    editEssayKnowForms.close();
  };

  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<FormValues>({
    defaultValues: {
      question: essay["question"],
      score: essay["score"],
    },
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const { mutate, isSuccess } = usePutAuth(
    `/api/know/essay/${editEssayKnowForms.topicId}`,
    "lecturer"
  );

  const onSubmit = (data: FormValues) => {
    mutate(
      { body: data },
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
      <p>{isLoading}</p>
      <Modal
        label="Edit Pertanyaan Know"
        content={content}
        isOpen={editEssayKnowForms.isOpen}
        close={editEssayKnowForms.close}
      />
    </div>
  );
};

export default EditEssayKnowForms;
