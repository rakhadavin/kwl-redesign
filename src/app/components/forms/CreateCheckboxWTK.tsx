"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Modal from "../modals/Modal";
import { usePostAuth } from "@/app/lib/api/useAuth";
import WidthButton from "../button/WidthButton";

import useCreateCheckboxWTKForms from "@/app/hooks/useCreateCheckboxWTK";
import ChooseWTKType from "../quiz/ChooseWTKType";
import usePreReadingMaterialForms from "@/app/hooks/usePreReadingMaterialForms";
import useChooseWTKType from "@/app/hooks/useChooseWTKType";

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
  const chooseWTKType = useChooseWTKType();
  const preReadingMaterialForms = usePreReadingMaterialForms();

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

  const { mutate, isSuccess } = usePostAuth("/api/wtk/poll", "lecturer");

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

  const handleBack = () => {
    createCheckboxWTKForms.close();
    chooseWTKType.open(createCheckboxWTKForms.topicId);
  };

  const handleNext = () => {
    preReadingMaterialForms.open(createCheckboxWTKForms.topicId); // Buka modal sukses
    createCheckboxWTKForms.close();
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
            className="p-2 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
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
