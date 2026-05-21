"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Modal from "../modals/Modal";
import EssayContent from "./EssayContent";
import { usePostAuth } from "@/app/lib/api/useAuth";

import useCreateEssayLearnedForms from "@/app/hooks/useCreateEssayLearnedForms";
import useSuccessCreateLearned from "@/app/hooks/useSuccessCreateLearned";
import useChooseLearnedType from "@/app/hooks/useChooseLearnedType";

type FormValues = {
  question: string;
  score: number;
};

const CreateEssayLearnedForms = () => {
  const createEssayLearnedForms = useCreateEssayLearnedForms();
  const successCreateLearned = useSuccessCreateLearned();
  const chooseLearnedType = useChooseLearnedType();

  const handleBack = () => {
    createEssayLearnedForms.close();
    chooseLearnedType.open(createEssayLearnedForms.topicId);
  };

  const handleNext = () => {
    successCreateLearned.open();
    createEssayLearnedForms.close();
  };

  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const { mutate, isPending } = usePostAuth("/api/learned/essay", "lecturer");

  const onSubmit = (data: FormValues) => {
    const postData = {
      ...data,
      type: "reflection",
      topic: createEssayLearnedForms.topicId,
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

        <div className="btn-group flex gap-2">
          <button
            type="button"
            disabled={isPending}
            className="w-full bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold text-xs py-2 px-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit(handleBack)}
          >
            Kembali
          </button>

          <button
            type="button"
            disabled={isPending}
            className={`w-full border-2 font-bold text-xs py-2 px-2 rounded-xl transition-colors flex items-center justify-center gap-1 ${
              isPending
                ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#338750] border-[#338750] hover:bg-[#2a6e40] hover:border-[#2a6e40] text-white"
            }`}
            onClick={handleSubmit(onSubmit)}
          >
            {isPending ? (
              <>
                <svg className="animate-spin w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Loading...
              </>
            ) : "Simpan"}
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );

  return (
    <div>
      <Modal
        label="Buat Pertanyaan Learned"
        content={content}
        isOpen={createEssayLearnedForms.isOpen}
        close={createEssayLearnedForms.close}
      />
    </div>
  );
};

export default CreateEssayLearnedForms;
