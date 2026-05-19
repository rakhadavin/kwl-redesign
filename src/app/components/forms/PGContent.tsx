"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../modals/Modal";

import useCreatePGKnowForms from "@/app/hooks/useCreatePGKnow";
import useSuccessCreateKnow from "@/app/hooks/useSuccessCreateKnow";
import useChooseKnowType from "@/app/hooks/useChooseKnowType";

type FormValues = {
  image: File;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  score: number;
};

interface PGContentProps {
  handleBack?: () => void;
  handleNext: () => void;
  labelButton: string;
}

const PGContent: React.FC<PGContentProps> = ({
  handleBack,
  handleNext,
  labelButton,
}) => {
  const createPGKnowForms = useCreatePGKnowForms();
  const successCreateKnow = useSuccessCreateKnow();
  const chooseKnowType = useChooseKnowType();

  const [showQuestions, setShowQuestions] = useState<boolean[]>(
    new Array(10).fill(false)
  );

  const form = useForm<FormValues>();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = form;
  const handleSave = (data: FormValues) => {
    handleNext();
  };

  const toggleQuestion = (index: number) => {
    setShowQuestions((prev) => {
      const updatedQuestions = [...prev];
      updatedQuestions[index] = !updatedQuestions[index];
      return updatedQuestions;
    });
  };

  const [pertanyaanValues, setPertanyaanValues] = useState<string[]>(
    new Array(10).fill("")
  );

  const handleInputChange = (index: number, value: string) => {
    const updatedValues = [...pertanyaanValues];
    updatedValues[index] = value.trim();
    setPertanyaanValues(updatedValues);
  };

  const isPertanyaanChanged = (index: number) => {
    return pertanyaanValues[index] !== "";
  };

  const onSubmit = (data: FormValues) => {
    handleNext();
  };

  const questionContent = (index: number) => (
    <>
      <div className="mb-4 flex items-center py-0.5 shadow appearance-none border rounded w-full text-neutral-700 leading-tight">
        {!showQuestions[index] ? (
          <svg
            onClick={() => toggleQuestion(index)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="ml-2 w-4 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        ) : null}

        {showQuestions[index] ? (
          <svg
            onClick={() => toggleQuestion(index)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="ml-2 w-4 h-5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
          </svg>
        ) : null}

        <p className="ml-4">Pertanyaan {index + 1}</p>
      </div>

      {showQuestions[index] ? (
        <div>
          <div className="mb-4">
            <label className="text-xs font-bold" htmlFor={`image-${index}`}>
              Gambar *
            </label>
            <input
              className="shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              aria-describedby="file_input_help"
              id={`image-${index}`}
              type="file"
              accept="image/png, image/jpeg, image/gif"
            />
            <p className="error">
              {errors[`image-${index}` as keyof FormValues]?.message}
            </p>
            <p className="mt-1 text-sm text-gray-500" id="file_input_help">
              PNG, JPG or GIF
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor={`question-${index}`} className="text-xs font-bold">
              Pertanyaan
            </label>
            <textarea
              id={`question-${index}`}
              rows={2}
              {...register(`question-${index}` as keyof FormValues, {
                required:
                  index === 0
                    ? { value: true, message: "pertanyaan harus diisi" }
                    : false,
              })}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
            <p className="error">
              {errors[`question-${index}` as keyof FormValues]?.message}
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor={`option_a-${index}`} className="text-xs font-bold">
              Opsi A
            </label>
            <input
              id={`option_a-${index}`}
              {...register(`option_a-${index}` as keyof FormValues, {
                required:
                  index === 0 || isPertanyaanChanged(index)
                    ? { value: true, message: "opsi A harus diisi" }
                    : undefined,
              })}
              type="text"
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
            <p className="error">
              {errors[`option_a-${index}` as keyof FormValues]?.message}
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor={`option_b-${index}`} className="text-xs font-bold">
              Opsi B *
            </label>
            <input
              id={`option_b-${index}`}
              type="text"
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
            <p className="error">
              {errors[`option_b-${index}` as keyof FormValues]?.message}
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor={`option_c-${index}`} className="text-xs font-bold">
              Opsi C *
            </label>
            <input
              id={`option_c-${index}`}
              type="text"
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
            <p className="error">
              {errors[`option_c-${index}` as keyof FormValues]?.message}
            </p>
          </div>

          <div className="mb-10">
            <label htmlFor={`option_d-${index}`} className="text-xs font-bold">
              Opsi D *
            </label>
            <input
              id={`option_d-${index}`}
              type="text"
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
            <p className="error">
              {errors[`option_d-${index}` as keyof FormValues]?.message}
            </p>
          </div>

          <div className="mb-4">
            <label
              htmlFor={`correct_option-${index}`}
              className="text-xs font-bold"
            >
              Jawaban Benar
            </label>
            <select
              id={`correct_option-${index}`}
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            >
              <option selected>Choose a correct answer</option>
              <option value="A">Opsi A</option>
              <option value="B">Opsi B</option>
              <option value="C">Opsi C</option>
              <option value="D">Opsi D</option>
            </select>
            <p className="error">
              {errors[`correct_option-${index}` as keyof FormValues]?.message}
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor={`score-${index}`} className="text-xs font-bold">
              Poin
            </label>
            <input
              id={`score-${index}`}
              {...register(`score-${index}` as keyof FormValues, {
                required:
                  index === 0 || isPertanyaanChanged(index)
                    ? { value: true, message: "poin harus diisi" }
                    : false,
                pattern: {
                  value: /^[0-9]*$/,
                  message: "poin harus berupa angka",
                },
              })}
              type="text"
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
            <p className="error">
              {errors[`score-${index}` as keyof FormValues]?.message}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
  return (
    <div>
      <p className="text-main font-semibold font-sm py-2">Detail Soal</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Array.from({ length: 10 }, (_, index) => (
          <div key={index}>{questionContent(index)}</div>
        ))}
        <div className="flex justify-between">
          {handleBack && (
            <button
              type="button"
              className="mb-10 w-32 h-7 h-[30px] rounded rounded-md bg-dark-accent border-2 border-dark-accent hover:bg-transparent hover:text-dark-accent hover:border-dark-accent text-white font-bold text-xs py-2 px-2"
              onClick={handleSubmit(handleBack)}
            >
              Kembali
            </button>
          )}
          <button
            type="submit"
            className="mb-10 w-32 h-7 h-[30px] rounded rounded-md bg-green-accent border-2 border-green-accent hover:bg-transparent hover:text-green-accent hover:border-green-accent text-white font-bold text-xs py-2 px-2"
            onClick={handleSubmit(onSubmit)}
          >
            {labelButton}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PGContent;
