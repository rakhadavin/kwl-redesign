"use client";

import { useGetAuth } from "@/app/lib/api/useAuth";
import { useRouter, useParams } from "next/navigation";
import PesertaCourseContainer from "@/app/components/card/PesertaCourseContainer";
import UnenrolConfirmation from "@/app/components/message/UnenrolConfirmation";
import SuccessUnenrolCourse from "@/app/components/message/SuccessUnenrolCourse";
import Breadcrumb from "@/app/components/navigation/Breadcrumb";

export default function MyCoursesPage() {
  const params = useParams();
  const router = useRouter();

  const { data, status } = useGetAuth("/api/course/student", "student courses");

  return (
    <main className="p-5">
      <Breadcrumb variant="light" items={[
        { label: "Beranda", href: "/peserta" },
        { label: "Kursus Saya" },
      ]} />
      <div className="flex items-start">
        {/* <svg
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
        </svg> */}
        <div className="flex-1">
          <h1 className="flex-1 text-main font-bold text-2xl text-center">
            My Courses
          </h1>
          <h2 className="py-5 text-black font-bold text-xl text-center">
            Courses
          </h2>
        </div>
      </div>

      <PesertaCourseContainer
        data={data || []}
        isLoading={status === "pending"}
      />
      <UnenrolConfirmation />
      <SuccessUnenrolCourse />
    </main>
  );
}
