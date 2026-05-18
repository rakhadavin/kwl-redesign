import useCreateQuizForms from "@/app/hooks/useCreateQuizForms";
import useSuccessCreateQuiz from "@/app/hooks/useSuccessCreateQuiz";
import { usePostAuth } from "@/app/lib/api/useAuth";
import { useForm } from "react-hook-form";
import Modal from "../modals/Modal";

type FormValues = {
  title: string;
  description: string;
}

const CreateQuizForms = () => {

  const createQuizForms = useCreateQuizForms();
  const successCreateQuiz = useSuccessCreateQuiz();

  const form = useForm<FormValues>();

  const { register, handleSubmit, control, formState } = form;
  const { errors } = formState;

  const { mutate } = usePostAuth("/api/quiz/quizzes/", "create quiz");
  
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

  const handleNext = () => {
    successCreateQuiz.open();
    createQuizForms.close();
  };

const content = (
  <div>
    <p className="text-main font-semibold font-sm py-2">
      Deskripsikan Quiz Anda
    </p>
    <form>
      <div className="mb-4">
          <label htmlFor="title" className="text-xs font-bold">
            Title
          </label>
          <input
            id="title"
            {...register("title", {
              required: {
                value: true,
                message: "Title is required",
              },
              maxLength: {
                value: 100,
                message: "Max length is 100 characters",
              },
            })}
            type="text"
            className="shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
          />
          <p className="error">{errors.title?.message}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="text-xs font-bold">
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: {
                value: true,
                message: "Description is required",
              },
              maxLength: {
                value: 500,
                message: "Max length is 500 characters",
              },
            })}
            className="shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
          />
          <p className="error">{errors.description?.message}</p>
        </div>
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="bg-main text-white px-4 py-2 rounded mt-2"
        >
          Create Quiz
        </button>
    </form>
  </div>
)

  return (
    <div>
      <Modal
        isOpen={createQuizForms.isOpen}
        close={createQuizForms.close}
        label="Create New Quiz"
        content={content}
      />
    </div>
  );
}

export default CreateQuizForms;