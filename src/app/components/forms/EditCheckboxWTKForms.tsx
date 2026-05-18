"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Modal from "../modals/Modal";
import {
  usePutAuth,
  useGetAuth,
  useGetAuthWithTopicId,
} from "@/app/lib/api/useAuth";

import useEditCheckboxWTKForms from "@/app/hooks/useEditCheckboxWTKForms";
import useEditPreReadingMaterialForms from "@/app/hooks/useEditPreReadingMaterialForms";
import useChooseWTKType from "@/app/hooks/useChooseWTKType";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
type FormValues = {
  question: string;
  type: string;
  score: number;
  options: {
    options: string;
  }[];
};

const EditCheckboxWTKForms = () => {
  const editCheckboxWTKForms = useEditCheckboxWTKForms();
  const topicId = editCheckboxWTKForms.topicId;

  const {
    data,
    status,
    isSuccess: success,
  } = useGetAuthWithTopicId("/api/wtk/poll/", "prev poll wtk", topicId);


  if (status === "success") {
    return <EditCheckboxWTKFormsChild poll={data} />;
  }
};

const EditCheckboxWTKFormsChild = ({ poll }: any) => {
  const editCheckboxWTKForms = useEditCheckboxWTKForms();

  const chooseWTKType = useChooseWTKType();
  const editPreReadingMaterialForms = useEditPreReadingMaterialForms();

  const form = useForm<FormValues>({
    defaultValues: {
      question: poll?.question?.question,
      score: poll?.question?.score,
      options: poll?.options
        ? poll.options.map((option: any) => ({
            options: option.option_answer,
            id: option.id,
          }))
        : [],
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "options",
    control,
  });

  const { mutate, isSuccess } = usePutAuth(
    `/api/wtk/poll/${editCheckboxWTKForms.topicId}`,
    "lecturer"
  );

  const onSubmit = (data: FormValues) => {
    const transformedOptions: string[] = data.options.map(
      (obj: any) => obj.options
    );
    const transformedOptionsId: string[] = data.options.map(
      (obj: any) => obj.id
    );
    const postData = {
      question: data.question,
      score: data.score,
      options: transformedOptions,
      options_ids: transformedOptionsId,
      topic: editCheckboxWTKForms.topicId,
    };
    // if the length of data is more than the poll options, then it means that the user added a new option, edit the ids of the new options
    if (data.options.length > poll.options.length) {
      for (let i = poll.options.length; i < data.options.length; i++) {
        postData.options_ids[i] = "0";
      }
    }

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
    editCheckboxWTKForms.close();
    chooseWTKType.open(editCheckboxWTKForms.topicId);
  };

  const handleNext = () => {
    editPreReadingMaterialForms.open(editCheckboxWTKForms.topicId);
    editCheckboxWTKForms.close();
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
                        required: {
                          value: true,
                          message:
                            index === 0
                              ? "opsi pertama harus diisi"
                              : "opsi harus diisi",
                        },
                        maxLength: {
                          value: 1000,
                          message: "Maksimal 1000 karakter",
                        },
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
                    {errors.options && errors.options[index]?.options?.message}
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
        label="Edit Polling Want to Know"
        content={content}
        isOpen={editCheckboxWTKForms.isOpen}
        close={editCheckboxWTKForms.close}
      />
    </div>
  );
};

export default EditCheckboxWTKForms;
