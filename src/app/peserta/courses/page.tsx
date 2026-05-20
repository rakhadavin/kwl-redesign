"use client";

import { useSession } from "next-auth/react";
import * as React from "react";
import {
  useGetObjects,
  useGetObjectsWithStudent,
} from "@/app/lib/peserta/useCourses";
import { useRouter } from "next/navigation";

import PesertaCourseCard from "@/app/components/card/PesertaCourseCard";
import AllPesertaCourseContainer from "@/app/components/card/AllPesertaCourseContainer";
import router from "next/router";
import EnrolConfirmation from "@/app/components/message/EnrolConfirmation";
import UnenrolConfirmation from "@/app/components/message/UnenrolConfirmation";
import EnrolKeyConfirmation from "@/app/components/message/EnrolKeyConfirmation";
import SuccessEnrolCourse from "@/app/components/message/SuccessEnrolCourse";

export default function MyCoursesPage() {
  const router = useRouter();
  const { data, status } = useGetObjectsWithStudent(
    "/api/course/all/",
    "courses"
  );

  return (
    <main className="p-5">
      <div className="flex items-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="hidden sm:block w-6 h-6 ml-5 text-main hover:opacity-80 cursor-pointer"
          onClick={router.back}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <div className="flex-1">
          <h1 className="text-main font-bold text-2xl text-center">
            All Courses
          </h1>
          <h2 className="py-5 text-black font-bold text-xl text-center">
            Courses
          </h2>
        </div>
      </div>

      <AllPesertaCourseContainer
        data={data || []}
        isLoading={status === "pending"}
      />

      <EnrolConfirmation />
      <EnrolKeyConfirmation />
      <UnenrolConfirmation />
      <SuccessEnrolCourse />
    </main>
  );
}
