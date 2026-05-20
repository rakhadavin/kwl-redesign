"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import SearchBar from "../components/button/SearchBar";
import CreateCourseForms from "@/app/components/forms/CreateCourseForms";
import CreateCourse2Forms from "@/app/components/forms/CreateCourse2Forms";
import { useGetAuth } from "@/app/lib/api/useAuth";
import MyCourseContainer from "../components/card/MyCourseContainer";
import UnenrolConfirmation from "@/app/components/message/UnenrolConfirmation";
import SuccessUnenrolCourse from "@/app/components/message/SuccessUnenrolCourse";
import DeleteCourseConfirmation from "@/app/components/message/DeleteCourseConfirmation";
import SuccessCreateCourse from "@/app/components/message/SuccessCreateCourse";
import useCreateCourseForms from "@/app/hooks/useCreateCourseForms";

export default function MyCoursesPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const createCourseForms = useCreateCourseForms();

  const { data } = useGetAuth("/api/course/lecturer", "lecturer courses");

  const isDosen = session?.userinfo?.role === "lecturer";
  console.log("My Courses Data:", data);
  const filteredData = data
    ?.filter((course: any) => {
      const q = searchQuery.toLowerCase();

      return (
        course.full_name?.toLowerCase().includes(q) ||
        course.short_name?.toLowerCase().includes(q)
      );
    })
    .sort((a: any, b: any) => {
      const dateA = a.created ? new Date(a.created).getTime() : 0;
      const dateB = b.created ? new Date(b.created).getTime() : 0;

      return dateB - dateA; // newest first
    });
  return (
    <main className="p-5 flex flex-col items-center">
      <div className="flex items-start w-full ">
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
          <h1 className="py-5 text-main font-bold text-2xl text-center">
            My Courses
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        {isDosen && (
          <button
            onClick={() => createCourseForms.open()}
            className="flex items-center gap-2 bg-main text-white font-bold text-sm py-2.5 px-4 rounded-lg hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            <span className="text-lg leading-none">+</span> Add Course
          </button>
        )}
      </div>

      <MyCourseContainer data={filteredData} />
      <CreateCourseForms />
      <CreateCourse2Forms />
      <DeleteCourseConfirmation />
      <SuccessCreateCourse />
      <UnenrolConfirmation />
      <SuccessUnenrolCourse />
    </main>
  );
}
