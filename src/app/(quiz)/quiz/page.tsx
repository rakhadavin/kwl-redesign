"use client";

import { useGetAuth } from "@/app/lib/api/useAuth";
import CreateQuizForms from "@/app/components/forms/CreateQuizForms";
import AddCourseButton from "@/app/components/button/AddCourseButton";
import AllQuizContainer from "@/app/components/card/AllQuizContainer";
import CreatePGQuizForms from "@/app/components/forms/CreatePGQuizForms";

export default function QuizPage() {
  
  const { data } = useGetAuth("/api/quiz/quizzes/", "all quiz");
  
  return(
    <main className="p-5">
      <div className="flex items-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="hidden sm:block w-6 h-6 ml-5 text-main hover:opacity-80 cursor-pointer hidden-xs"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <div className="flex-1">
          <h1 className="py-5 text-main font-bold text-2xl text-center">
            All Quiz
          </h1>
        </div>
      </div>
      <AllQuizContainer data={data} />
      <CreateQuizForms />
      <CreatePGQuizForms />
      <AddCourseButton add="quiz" />
    </main>
  );
}

