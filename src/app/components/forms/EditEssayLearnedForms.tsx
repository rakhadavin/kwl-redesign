"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Modal from "../modals/Modal";
import { useGetAuth, useGetAuthWithTopicId, usePutAuth } from "@/app/lib/api/useAuth";

import useEditEssayLearnedForms from "@/app/hooks/useEditEssayLearned";
import useSuccessCreateLearned from "@/app/hooks/useSuccessCreateLearned";

type FormValues = {
  question: string;
  score: number;
};

const EditEssayLearnedForms = () => {
  const editEssayLearnedForms = useEditEssayLearnedForms();
  const {
    data,
    status,
    isSuccess: success,
  } = useGetAuthWithTopicId(
    `/api/learned/essay/`,
    "prev essay learned",
    editEssayLearnedForms.topicId 
  );

  if (status === "success") {
    return <EditEssayLearnedFormsChild essay={data} />;
  }
};

const EditEssayLearnedFormsChild = ({ essay }: any) => {
  const editEssayLearnedForms = useEditEssayLearnedForms();
  const successCreateLearned = useSuccessCreateLearned();

  const handleNext = () => {
    successCreateLearned.open();
    editEssayLearnedForms.close();
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
    `/api/learned/essay/${editEssayLearnedForms.topicId}`,
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
        label="Edit Pertanyaan Learned"
        content={content}
        isOpen={editEssayLearnedForms.isOpen}
        close={editEssayLearnedForms.close}
      />
    </div>
  );
};

export default EditEssayLearnedForms;
