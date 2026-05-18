"use client";

import { useGetAuth } from "@/app/lib/api/useAuth";
import AddCourseButton from "@/app/components/button/AddCourseButton";
import AllKuesionerContainer from "@/app/components/card/AllKuesionerContainer";
// import CreatePGQuizForms from "@/app/components/forms/CreatePGQuizForms";
import CreateKuesionerForms from "@/app/components/forms/CreateKuesionerForms";

export default function KuesionerPage() {

  const { data } = useGetAuth("/api/kuesioner/", "all kuesioner");

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
            Semua Kuesioner
          </h1>
        </div>
      </div>
      <AllKuesionerContainer data={data} />
      <CreateKuesionerForms />
      <AddCourseButton add="quiz" />
    </main>
  );
}

