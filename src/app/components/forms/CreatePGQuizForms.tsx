import useCreateQuizQuestionForms from "@/app/hooks/useCreateQuizQuestionForms";
import Modal from "../modals/Modal";
import useSuccessCreateQuizQuestion from "@/app/hooks/useSuccessCreateQuizQuestion";
import { useForm } from "react-hook-form";
// import useChooseQuizType from "@/app/hooks/useChooseQuizType";
import { useState, useEffect } from "react";
import { useGetAuth, usePutAuth } from "@/app/lib/api/useAuth";

type Choice = {
  choiceText: string;
  isCorrect: boolean;
}

type Question = {
  questionText: string;
  score: number;
  choice: Choice[];
  correctAnswer: string; 
}

type FormValues = {
  id: string;
  question: Question[];
}

const CreatePGQuizForms = () => {
  const createQuizQuestionForms = useCreateQuizQuestionForms();
  const successCreateQuizQuestion = useSuccessCreateQuizQuestion();
  // const chooseQuizType = useChooseQuizType();

  const [showQuestions, setShowQuestions] = useState<boolean[]>(
    [true, ...new Array(9).fill(false)]
  );

  const [pertanyaanValues, setPertanyaanValues] = useState<string[]>(
    new Array(10).fill("")
  );

  const form = useForm<FormValues>();
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const quizId = createQuizQuestionForms.quizId;
  const { data, isLoading } = useGetAuth(
    `/api/quiz/quizzes/${quizId}`, 
    `detail quiz ${quizId}`,
  );

  useEffect(() => {
    if (data?.data) {
      const quizData = data.data;
      
      const transformedQuestions = quizData?.questions?.map((q: any) => {
        const correctIndex = q.choices.findIndex((c: any) => c.is_correct);
        
        const transformedChoices = [
          { choiceText: q.choices[0]?.choice_text || "" },
          { choiceText: q.choices[1]?.choice_text || "" },
          { choiceText: q.choices[2]?.choice_text || "" },
          { choiceText: q.choices[3]?.choice_text || "" },
        ];

        return {
          questionText: q.question_text,
          score: q.score,
          choice: transformedChoices,
          correctAnswer: correctIndex !== -1 ? correctIndex.toString() : ""
        };
      }) || [];

      const allQuestions = [...transformedQuestions];
      while (allQuestions.length < 10) {
        allQuestions.push({
          questionText: "",
          score: 0,
          choice: [
            { choiceText: "" },
            { choiceText: "" },
            { choiceText: "" },
            { choiceText: "" }
          ],
          correctAnswer: ""
        });
      }

      reset({
        id: quizData.id,
        question: allQuestions,
      });

      const updatedShowQuestions = allQuestions.map((q: any) => 
        q.questionText !== ""
      );
      updatedShowQuestions[0] = true;
      setShowQuestions(updatedShowQuestions);
    }
  }, [data, reset]);

  const handleInputChange = (index: number, value: string) => {
    const updatedValues = [...pertanyaanValues];
    updatedValues[index] = value.trim();      
    setPertanyaanValues(updatedValues);
  };

  const toggleQuestion = (index: number) => {
    setShowQuestions((prev) => {
      const updatedQuestions = [...prev];
      updatedQuestions[index] = !updatedQuestions[index];
      return updatedQuestions;
    });
  };

  const { mutate, isPending } = usePutAuth(
    `/api/quiz/quizzes/${quizId}/questions/`,
    `updateQuizQuestions ${quizId}`
  );

  const onSubmit = (data: FormValues) => {
    const processedQuestions = data.question.map((q) => {
      const choicesWithCorrect = q.choice.map((c, idx) => ({
        choice_text: c.choiceText,
        is_correct: idx.toString() === q.correctAnswer
      }));

      return {
        question_text: q.questionText,
        score: parseInt(q.score.toString()),
        choices: choicesWithCorrect
      };
    });

    const filledQuestions = processedQuestions.filter(
      (q) => q.question_text && q.question_text.trim() !== ""
    );

    mutate({
      body: { 
        questions: filledQuestions 
      }
    }, {
      onSuccess: (response) => {
        successCreateQuizQuestion.open();
        createQuizQuestionForms.close();
      },
      onError: (error) => {
        console.error("Error saving quiz:", error);
      }
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
            strokeWidth="1.5"
            stroke="currentColor"
            className="ml-2 w-4 h-5 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
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
            strokeWidth="1.5"
            stroke="currentColor"
            className="ml-2 w-4 h-5 cursor-pointer"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        ) : null}

        <p className="ml-4">Pertanyaan {index + 1}</p>
      </div>

      {showQuestions[index] ? (
        <div>
          {/* Question Text */}
          <div className="mb-4">
            <label
              htmlFor={`question.${index}.questionText`}
              className="text-xs font-bold"
            >
              Pertanyaan
            </label>
            <textarea
              id={`question.${index}.questionText`}
              rows={2}
              {...register(`question.${index}.questionText`, {
                required: { value: true, message: "pertanyaan harus diisi" },
                maxLength: {
                  value: 1000,
                  message: "pertanyaan tidak boleh lebih dari 1000 karakter"
                }
              })}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
            <p className="error">{errors?.question?.[index]?.questionText?.message}</p>
          </div>

          {/* Choice A */}
          <div className="mb-4">
            <label
              htmlFor={`question.${index}.choice.0.choiceText`}
              className="text-xs font-bold"
            >
              Opsi A
            </label>
            <textarea
              id={`question.${index}.choice.0.choiceText`}
              {...register(`question.${index}.choice.0.choiceText`, {
                required: { value: true, message: "opsi A harus diisi" },
                maxLength: {
                  value: 1000,
                  message: "opsi A tidak boleh lebih dari 1000 karakter"
                }
              })}
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
            <p className="error">{errors?.question?.[index]?.choice?.[0]?.choiceText?.message}</p>
          </div>

          {/* Choice B */}
          <div className="mb-4">
            <label
              htmlFor={`question.${index}.choice.1.choiceText`}
              className="text-xs font-bold"
            >
              Opsi B
            </label>
            <textarea
              id={`question.${index}.choice.1.choiceText`}
              {...register(`question.${index}.choice.1.choiceText`, {
                required: { value: true, message: "opsi B harus diisi" },
                maxLength: {
                  value: 1000,
                  message: "opsi B tidak boleh lebih dari 1000 karakter"
                }
              })}
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
            <p className="error">{errors?.question?.[index]?.choice?.[1]?.choiceText?.message}</p>
          </div>

          {/* Choice C */}
          <div className="mb-4">
            <label
              htmlFor={`question.${index}.choice.2.choiceText`}
              className="text-xs font-bold"
            >
              Opsi C
            </label>
            <textarea
              id={`question.${index}.choice.2.choiceText`}
              {...register(`question.${index}.choice.2.choiceText`, {
                required: { value: true, message: "opsi C harus diisi" },
                maxLength: {
                  value: 1000,
                  message: "opsi C tidak boleh lebih dari 1000 karakter"
                }
              })}
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
            <p className="error">{errors?.question?.[index]?.choice?.[2]?.choiceText?.message}</p>
          </div>

          {/* Choice D */}
          <div className="mb-4">
            <label
              htmlFor={`question.${index}.choice.3.choiceText`}
              className="text-xs font-bold"
            >
              Opsi D
            </label>
            <textarea
              id={`question.${index}.choice.3.choiceText`}
              {...register(`question.${index}.choice.3.choiceText`, {
                required: { value: true, message: "opsi D harus diisi" },
                maxLength: {
                  value: 1000,
                  message: "opsi D tidak boleh lebih dari 1000 karakter"
                }
              })}
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
            <p className="error">{errors?.question?.[index]?.choice?.[3]?.choiceText?.message}</p>
          </div>

          {/* Correct Answer Dropdown */}
          <div className="mb-4">
            <label
              htmlFor={`question.${index}.correctAnswer`}
              className="text-xs font-bold"
            >
              Jawaban Benar
            </label>
            <select
              id={`question.${index}.correctAnswer`}
              {...register(`question.${index}.correctAnswer`, {
                required: { value: true, message: "jawaban benar harus dipilih" },
              })}
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            >
              <option value="">Pilih jawaban yang benar</option>
              <option value="0">Opsi A</option>
              <option value="1">Opsi B</option>
              <option value="2">Opsi C</option>
              <option value="3">Opsi D</option>
            </select>
            <p className="error">{errors?.question?.[index]?.correctAnswer?.message}</p>
          </div>

          {/* Score */}
          <div className="mb-4">
            <label
              htmlFor={`question.${index}.score`}
              className="text-xs font-bold"
            >
              Poin
            </label>
            <input
              id={`question.${index}.score`}
              {...register(`question.${index}.score`, {
                required: { value: true, message: "poin harus diisi" },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "poin harus berupa angka",
                },
              })}
              type="text"
              className="py-1 shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
            <p className="error">{errors?.question?.[index]?.score?.message}</p>
          </div>
        </div>
      ) : null}
    </>
  );

  const content = (
    <>
      <p className="text-main font-semibold font-sm py-2">Detail Soal</p>

      {isLoading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index}>{questionContent(index)}</div>
          ))}
          <div className="btn-group flex flex-col">
            <button
              type="submit"
              disabled={isPending}
              className={`mb-1 w-full border-2 font-bold text-xs py-2 px-2 rounded-xl transition-colors flex items-center justify-center gap-1 ${
                isPending
                  ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-transparent border-dark-accent hover:bg-dark-accent hover:text-white text-dark-accent"
              }`}
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
      )}
    </>
  );

  return (
    <div>
      <Modal
        isOpen={createQuizQuestionForms.isOpen}
        close={createQuizQuestionForms.close}
        label="Create Question"
        content={content}
      />
    </div>
  );
};

export default CreatePGQuizForms;