"use client";

import SearchBar from "@/app/components/button/SearchBar";
import TableParticipant from "@/app/components/courseDetail/TableParticipant";
import CourseContent from "@/app/components/forms/CourseContent";
import PGContent from "@/app/components/forms/PGContent";
import { useRouter, useParams } from "next/navigation";
import { useGetAuth } from "@/app/lib/api/useAuth";
import { useState } from "react";

export default function KnowSubmissionPage() {
  const params = useParams();
  const router = useRouter();

  const { data: topic } = useGetAuth(
    `/api/course/topic/${params.id_topic}`,
    "lecturer"
  );

  return (
    <div className="relative">
      <main className="py-5 bg-cover bg-scroll bg-[url('/bg2.png')] min-h-screen ">
        <div className="flex items-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="white"
            className="hidden sm:block hidden sm:block w-6 h-6 ml-5 hover:opacity-80 cursor-pointer"
            onClick={router.back}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>

          <div className="flex-1">
            <h1 className="text-main font-bold text-2xl text-center text-white">
              {topic && topic?.["course_data"]["full_name"]}
            </h1>
            <h2 className="pb-5 text-main text-center text-white">
              {topic && topic["name"]}
            </h2>
          </div>
        </div>
        <TableParticipant isButtonActive={true} />
      </main>
    </div>
  );
}

