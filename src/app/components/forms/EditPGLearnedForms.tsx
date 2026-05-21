"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../modals/Modal";
// import { usePostAuth } from "@/app/lib/api/useAuth";
import { useGetAuthWithTopicId, usePutAuth } from "@/app/lib/api/useAuth";
import PGContent from "./PGContent";

import useEditPGLearnedForms from "@/app/hooks/useEditPGLearnedForms";
import useSuccessCreateLearned from "@/app/hooks/useSuccessCreateLearned";
import useChooseLearnedType from "@/app/hooks/useChooseLearnedType";

// type FormValues = {
//   image: File;
//   question: string;
//   option_a: string;
//   option_b: string;
//   option_c: string;
//   option_d: string;
//   correct_option: string;
//   score: number;
// };

type FormData = {
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


// type formData

const EditPGLearnedForms = () => {
  const editPGLearnedForms = useEditPGLearnedForms();
  const {
    data,
    status,
    isSuccess: success,
  } = useGetAuthWithTopicId(`/api/learned/quiz/`, "edit quiz",editPGLearnedForms.topicId);

  // if (status === "pending") {
  //   return <div>Loading...</div>;
  // }
  if (status === "success") {
    return <EditPGLearnedFormsChild quiz={data} />;
  }
}

const EditPGLearnedFormsChild = ({quiz}:any) => {
  const editPGLearnedForms = useEditPGLearnedForms();
  const successCreateLearned = useSuccessCreateLearned();
  const chooseLearnedType = useChooseLearnedType();

  const [showQuestions, setShowQuestions] = useState<boolean[]>(
    [true, ...new Array(9).fill(false)]
  );

  const form = useForm<FormData>({
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
          id: question.id,
        };
      }),
    },
  });
  // const { register, handleSubmit, reset, formState, control } = form;
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = form;

  const handleNext = () => {
    successCreateLearned.open();
    editPGLearnedForms.close();
  };

  const handleBack = () => {
    editPGLearnedForms.close();
    chooseLearnedType.open(editPGLearnedForms.topicId);
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
    updatedValues[index] = value.trim(); // Trim whitespace
    setPertanyaanValues(updatedValues);
  };

  const isPertanyaanChanged = (index: number) => {
    return pertanyaanValues[index] !== "";
  };

  const { mutate, isPending } = usePutAuth(
    `/api/learned/quiz`,
    "lecturer"
  );

  const onSubmit = (data: FormData) => {


    const total_quiz_questions: number = quiz.questions.length;
    const new_total_quiz_questions: number= data['soal'].length;

    for (let i = total_quiz_questions; i < new_total_quiz_questions; i++) {
      if(data['soal'][i].id==null){
        data['soal'][i].id=0;
      }
    }


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
            <label htmlFor={`question-${index}`} className="text-xs font-bold">
              Pertanyaan
            </label>
            <textarea
              id={`question-${index}`}
              rows={2}
              {...register(`soal.${index}.question`, {
                required: { value: true, message: "pertanyaan harus diisi" },
                maxLength: {  
                  value: 1000,
                  message: "pertanyaan tidak boleh lebih dari 1000 karakter"
                }
              })}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
            <p className="error">
              {errors[`soal.${index}.question` as keyof FormData]?.message}
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor={`option_a-${index}`} className="text-xs font-bold">
              Opsi A
            </label>
            <textarea
              id={`option_a-${index}`}
              {...register(`soal.${index}.option_a`, {
                required: { value: true, message: "opsi A harus diisi" },
                maxLength: {
                  value: 1000,
                  message: "opsi A maksimal 1000 karakter",
                },
              })}        
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
            <p className="error">
              {errors[`soal.${index}.option_a` as keyof FormData]?.message}
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor={`option_b-${index}`} className="text-xs font-bold">
              Opsi B
            </label>
            <textarea
              id={`option_b-${index}`}
              {...register(`soal.${index}.option_b`,
                {
                  required: { value: true, message: "opsi B harus diisi" },
                maxLength: {  
                      value: 1000,
                      message: "opsi B tidak boleh lebih dari 1000 karakter"
                    }
                }
              )}
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
            <p className="error">
              {errors[`soal.${index}.option_b` as keyof FormData]?.message}
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor={`option_c-${index}`} className="text-xs font-bold">
              Opsi C
            </label>
            <textarea
              id={`option_c-${index}`}
              {...register(`soal.${index}.option_c`,{
                required: { value: true, message: "opsi C harus diisi" },
                maxLength: {  
                      value: 1000,
                      message: "maksimal 1000 karakter"
                }
              })}
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
            <p className="error">
              {errors[`soal.${index}.option_c` as keyof FormData]?.message}
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor={`option_d-${index}`} className="text-xs font-bold">
              Opsi D
            </label>
            <textarea
              id={`option_d-${index}`}
              {...register(`soal.${index}.option_d`,
              {
                required: { value: true, message: "opsi D harus diisi" },
                maxLength: {  
                      value: 1000,
                      message: "opsi D tidak boleh lebih dari 1000 karakter"
                    }
              })}
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
            <p className="error">
              {errors[`soal.${index}.option_d` as keyof FormData]?.message}
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
              {...register(`soal.${index}.correct_option`, {
                required: { value: true, message: "jawaban benar harus diisi" }
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
            <label htmlFor={`score-${index}`} className="text-xs font-bold">
              Poin
            </label>
            <input
              id={`score-${index}`}
              {...register(`soal.${index}.score`, {
                required: { value: true, message: "poin harus diisi" },
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
      {/* </form> */}
      {/* <DevTool control={control} /> */}
    </>
  );

  const content = (
    <>
      <p className="text-main font-semibold font-sm py-2">Detail Soal</p>
      {/* <form> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {Array.from({ length: 10 }, (_, index) => (
          <div key={index}>{questionContent(index)}</div>
        ))}
        {/* <div className="flex justify-between">
          {handleBack && (
            <button
              type="button"
              className="mb-10 w-32 h-7 h-[30px] rounded rounded-md bg-dark-accent border-2 border-dark-accent hover:bg-transparent hover:text-dark-accent hover:border-dark-accent text-white font-bold text-xs py-2 px-2"
              onClick={handleSubmit(handleBack)}
            >
              sebelumnya
            </button>
          )}
          <button
            type="submit"
            className="mb-10 w-32 h-7 h-[30px] rounded rounded-md bg-green-accent border-2 border-green-accent hover:bg-transparent hover:text-green-accent hover:border-green-accent text-white font-bold text-xs py-2 px-2"
            onClick={handleSubmit(onSubmit)}
          >
            simpan
          </button> */}
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
        {/* </div> */}
      </form>
    </>
  );

  return (
    <div>
      <Modal
        label="Edit Pertanyaan Learned"
        // content={
        //   <PGContent
        //     handleBack={handleBack}
        //     handleNext={handleNext}
        //     labelButton="selanjutnya"
        //   />
        // }
        content={content}
        isOpen={editPGLearnedForms.isOpen}
        close={editPGLearnedForms.close}
      />
    </div>
    // <div></div>
  );
};

export default EditPGLearnedForms;
