"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../modals/Modal";
import { usePostAuth, useGetAuth, useGetAuthWithTopicId, usePutAuth } from "@/app/lib/api/useAuth";

import useEditPGKnowForms from "@/app/hooks/useEditPGknowForms";
import useSuccessCreateKnow from "@/app/hooks/useSuccessCreateKnow";
import useChooseKnowType from "@/app/hooks/useChooseKnowType";

type FormValues = {
  soal: {
    question: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_option: string;
    score: number;
    id: number;
  }[];
};

const EditPGKnowForms = () => {
  const editPGKnowForms = useEditPGKnowForms();

  const {
    data,
    status,
    isSuccess: success,
  } = useGetAuthWithTopicId(`/api/know/quiz/`, "pg know form",editPGKnowForms.topicId);

  if (status === "success") {
    return <EditPGKnowFormsChild quiz={data} />;
  }
};

const EditPGKnowFormsChild = ({ quiz }: any) => {


  const editPGKnowForms = useEditPGKnowForms();
  const successEditKnow = useSuccessCreateKnow();
  const chooseKnowType = useChooseKnowType();

  const [showQuestions, setShowQuestions] = useState<boolean[]>(
    [true, ...new Array(9).fill(false)]
  );

  const form = useForm<FormValues>({
    defaultValues: {
      soal: quiz?.questions.map((question: any) => {
        const option_labels = ["Opsi A", "Opsi B", "Opsi C", "Opsi D"]
        let correct_option = "";

        question.options.map((option: any, index: number) => {
          if (option.isCorrect) {
            correct_option = option_labels[index];
          }
          
        });
  
        return {
          question: question.question,
          score: question.score,
          option_a: question.options[0]?.option_answer,
          option_b: question.options[1]?.option_answer,
          option_c: question.options[2]?.option_answer,
          option_d: question.options[3]?.option_answer,
          correct_option: correct_option,
          id : question.id
        };
      }),
    },
  });


  const { register, control, handleSubmit, formState , getValues} = form;

  const { errors } = formState;

  const handleNext = () => {
    successEditKnow.open();
    editPGKnowForms.close();
  };

  const handleBack = () => {
    editPGKnowForms.close();
    chooseKnowType.open(editPGKnowForms.topicId);
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

  const { mutate } = usePutAuth("/api/know/quiz", "edit pg know quiz");

  const onSubmit = (data: FormValues) => {
  
    const total_quiz_questions: number = quiz.questions.length;
    const new_total_quiz_questions: number= data['soal'].length;

    for (let i = total_quiz_questions; i < new_total_quiz_questions; i++) {
      if(data['soal'][i].id==null){
        data['soal'][i].id=0;
      }
    }
;

    mutate({
      body: { "questions": data['soal'] }
    }, {
      onSuccess: () => {
        handleNext();

      },
    });
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
            <label
              htmlFor={`soal.${index}.question`}
              className="text-xs font-bold"
            >
              Pertanyaan
            </label>
            <textarea
              id={`soal.${index}.question`}
              rows={2}
              {...register(`soal.${index}.question` as keyof FormValues, {
                required: { value: true, message: "pertanyaan harus diisi" },
                maxLength: {  
                  value: 1000,
                  message: "pertanyaan tidak boleh lebih dari 1000 karakter"
                }
              })}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
            <p className="error">{errors?.soal?.[index]?.question?.message}</p>
          </div>

          <div className="mb-4">
            <label
              htmlFor={`soal.${index}.option_a`}
              className="text-xs font-bold"
            >
              Opsi A
            </label>
            <textarea
              id={`soal.${index}.option_a`}
              {...register(`soal.${index}.option_a` as keyof FormValues, {
                required: { value: true, message: "opsi A harus diisi" },
                maxLength: {  
                      value: 1000,
                      message: "opsi A tidak boleh lebih dari 1000 karakter"
                    }
              })}
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
            <p className="error">{errors?.soal?.[index]?.option_a?.message}</p>
          </div>

          <div className="mb-4">
            <label
              htmlFor={`soal.${index}.option_b`}
              className="text-xs font-bold"
            >
              Opsi B
            </label>
            <textarea
              id={`soal.${index}.option_b`}
              {...register(`soal.${index}.option_b` as keyof FormValues, {
                required: { value: true, message: "opsi B harus diisi" },
                maxLength: {  
                      value: 1000,
                      message: "opsi B tidak boleh lebih dari 1000 karakter"
                    }
              })}
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
            <p className="error">{errors?.soal?.[index]?.option_b?.message}</p>
          </div>

          <div className="mb-4">
            <label
              htmlFor={`soal.${index}.option_c`}
              className="text-xs font-bold"
            >
              Opsi C
            </label>
            <textarea
              id={`soal.${index}.option_c`}
              {...register(`soal.${index}.option_c` as keyof FormValues, {
                required: { value: true, message: "opsi C harus diisi" },
                maxLength: {  
                      value: 1000,
                      message: "maksimal 1000 karakter"
                }
              })}
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
            <p className="error">{errors?.soal?.[index]?.option_c?.message}</p>
          </div>

          <div className="mb-4">
            <label
              htmlFor={`soal.${index}.option_d`}
              className="text-xs font-bold"
            >
              Opsi D
            </label>
            <textarea
              id={`soal.${index}.option_d`}
              {...register(`soal.${index}.option_d` as keyof FormValues, {
                required: { value: true, message: "opsi D harus diisi" },
                maxLength: {  
                      value: 1000,
                      message: "opsi D tidak boleh lebih dari 1000 karakter"
                    }
              })}
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
            <p className="error">{errors?.soal?.[index]?.option_d?.message}</p>
          </div>

          <div className="mb-4">
            <label
              htmlFor={`soal.${index}.correct_option`}
              className="text-xs font-bold"
            >
              Jawaban Benar
            </label>
            <select
              id={`soal.${index}.correct_option`}
              {...register(`soal.${index}.correct_option` as keyof FormValues, {
                required: { value: true, message: "jawaban benar harus diisi" },
              })}
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            >
              <option value="" disabled selected>Choose a correct answer</option>
              <option value="Opsi A">Opsi A</option>
              <option value="Opsi B">Opsi B</option>
              <option value="Opsi C">Opsi C</option>
              <option value="Opsi D">Opsi D</option>
            </select>
            <p className="error">
              {errors?.soal?.[index]?.correct_option?.message}
            </p>
          </div>

          <div className="mb-4">
            <label
              htmlFor={`soal.${index}.score`}
              className="text-xs font-bold"
            >
              Poin
            </label>
            <input
              id={`soal.${index}.score`}
              {...register(`soal.${index}.score` as keyof FormValues, {
                required : { value: true, message: "poin harus diisi" },
                pattern: {
                  value: /^[0-9]*$/,
                  message: "poin harus berupa angka",
                },
              })}
              type="text"
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
            <p className="error">{errors?.soal?.[index]?.score?.message}</p>
          </div>
        </div>
      ) : null}
    </>
  );

  const content = (
    <>
      <p className="text-main font-semibold font-sm py-2">Detail Soal</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {Array.from({ length: 10 }, (_, index) => (
          <div key={index}>{questionContent(index)}</div>
        ))}
        <div className="btn-group flex flex-col">
          <button
            className="mb-1 w-full bg-dark-accent border-2 hover:bg-white hover:text-dark-accent hover:border-dark-accent text-white font-bold text-xs py-2 px-2 rounded-xl"
            onClick={handleSubmit(handleBack)}
          >
            sebelumnya
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
        label="Edit Pertanyaan Know"
        content={content}
        isOpen={editPGKnowForms.isOpen}
        close={editPGKnowForms.close}
      />
    </div>
  );
};

export default EditPGKnowForms;

