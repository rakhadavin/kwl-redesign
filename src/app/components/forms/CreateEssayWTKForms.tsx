"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Modal from "../modals/Modal";
import { usePostAuth } from "@/app/lib/api/useAuth";

import useCreateEssayWTKForms from "@/app/hooks/useCreateEssayWTKForms";

type FormValues = {
  question: string;
  score: number;
};

const CreateEssayWTKForms = () => {
  const createEssayWTKForms = useCreateEssayWTKForms();

  const handleNext = () => {
    createEssayWTKForms.close();
    window.location.reload();
  };

  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const { mutate, isPending } = usePostAuth("/api/wtk/essay", "lecturer");

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

        <div className="mb-4 p-3 rounded-lg border" style={{ backgroundColor: 'rgba(255, 130, 39, 0.3)', borderColor: '#FF8227' }}>
          <label htmlFor="score" className="text-xs font-bold">
            Poin
          </label>
          <p className="text-xs text-gray-600 mb-1">Masukkan nilai poin antara 0 - 100</p>
          <input
            id="score"
            {...register("score", {
              required: { value: true, message: "poin harus diisi" },
              pattern: {
                value: /^[0-9]*$/,
                message: "poin harus berupa angka",
              },
              validate: (value) => {
                const num = Number(value);
                if (isNaN(num) || num < 0 || num > 100) return "Poin harus antara 0 - 100";
                return true;
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
        label="Buat Pertanyaan Want to Know"
        content={content}
        isOpen={createEssayWTKForms.isOpen}
        close={createEssayWTKForms.close}
      />
    </div>
  );
};

export default CreateEssayWTKForms;
