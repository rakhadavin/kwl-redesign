"use client";

import Link from "next/link";
import AddCourseButton from "@/app/components/button/AddCourseButton";
import SearchBar from "../components/button/SearchBar";
import CreateCourseForms from "@/app/components/forms/CreateCourseForms";
import CreateCourse2Forms from "@/app/components/forms/CreateCourse2Forms";
// import CourseCard from "../../components/card/CourseCard";
import { useGetAuth } from "@/app/lib/api/useAuth";

import { useParams, useRouter } from "next/navigation";
import MyCourseContainer from "../components/card/MyCourseContainer";


export default function MyCoursesPage() {
  const params = useParams();
  const router = useRouter();

  const { data } = useGetAuth("/api/course/lecturer", "lecturer courses");

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
          <h1 className="py-5 text-main font-bold text-2xl text-center">
            My Courses
          </h1>
          {/* 
          <Link href={`/faq`}>
            <div className="text-center">
              <div className="m-2 shadow inline-flex bg-white rounded-l shadow">
                <div className="text-start">
                  <p className="w-[90%] md:w-[80%] lg:w-[400px] font-bold px-10">
                    Frequently Asked Question
                  </p>
                  <p className="w-[90%] md:w-[80%] lg:w-[400px] text-sm px-10">
                    Akses informasi tentang aplikasi K-Owl!
                  </p>
                </div>
                <img src="/faq_button/faq_button.png" width="150" />
              </div>
            </div>
          </Link> */}

          <h2 className="py-5 text-black font-bold text-xl text-center">
            Courses
          </h2>
        </div>
      </div>

      <AddCourseButton add="course" />

      {/* <CourseCard color="kowl-orange" /> */}
      <MyCourseContainer data={data} />
      <CreateCourseForms />
      <CreateCourse2Forms />
    </main>
  );
}
