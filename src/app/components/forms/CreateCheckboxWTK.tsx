"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Modal from "../modals/Modal";
import { usePostAuth } from "@/app/lib/api/useAuth";
import WidthButton from "../button/WidthButton";

import useCreateCheckboxWTKForms from "@/app/hooks/useCreateCheckboxWTK";

type FormValues = {
  question: string;
  type: string;
  score: number;
  options: {
    options: string;
  }[];
};

const CreateCheckboxWTKForms = () => {
  const createCheckboxWTKForms = useCreateCheckboxWTKForms();

  const form = useForm<FormValues>({
    defaultValues: {
      question: "",
      options: [{ options: "" }],
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "options",
    control,
  });

  const { mutate, isPending } = usePostAuth("/api/wtk/poll", "lecturer");

  const onSubmit = (data: FormValues) => {
    const transformedOptions: string[] = data.options.map((obj) => obj.options);
    const postData = {
      ...data,
      options: transformedOptions,
      type: "checkbox",
      topic: createCheckboxWTKForms.topicId,
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

  const handleNext = () => {
    createCheckboxWTKForms.close();
    window.location.reload();
  };

  const content = (
    <>
      <p className="text-main font-semibold font-sm py-2">Detail Soal</p>

      <form>
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
            className="p-2 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
          />
          <p className="error">{errors.question?.message}</p>
        </div>

        <div className="mb-4 flex flex-col">
          <label htmlFor="options" className="text-xs font-bold">
            Opsi
          </label>
          <div>
            {fields.map((field, index) => {
              return (
                <>
                  <div key={field.id} className="flex items-center mt-4">
                    <input
                      id="options"
                      {...register(`options.${index}.options`, {
                        required:
                          index === 0 ? "Opsi pertama harus diisi" : false,
                      })}
                      type="text"
                      className="p-2 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                    />

                    {index > 0 && (
                      <button onClick={() => remove(index)} type="button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 ml-2 text-gray-400 hover:text-gray-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                  <p className="error">
                    {index === 0 &&
                      errors.options &&
                      errors.options[index]?.options?.message}
                  </p>
                </>
              );
            })}

            <button
              onClick={() => append({ options: "" })}
              type="button"
              className="mt-2 pr-2 rounded hover:opacity-80 text-xs font-semibold text-center inline-flex items-center"
            >
              <img
                src="/option.png"
                alt="option"
                width={24}
                height={24}
                className="mr-2"
              ></img>
              Add Option
            </button>
          </div>
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
            className="p-2 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
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
    </>
  );
  return (
    <div>
      <Modal
        label="Buat Polling Want to Know"
        content={content}
        isOpen={createCheckboxWTKForms.isOpen}
        close={createCheckboxWTKForms.close}
      />
    </div>
  );
};

export default CreateCheckboxWTKForms;
