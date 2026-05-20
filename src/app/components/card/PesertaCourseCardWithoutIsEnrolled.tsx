"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useUnenroll } from "@/app/lib/peserta/useCourses";
import useUnenrolConfirmation from "@/app/hooks/useUnenrolConfirmation";
import useSuccessUnenrolCourse from "@/app/hooks/useSuccessUnenrolCourse";

interface CourseCardProps {
  id: number;
  courseLong: string;
  courseShort: string;
  color: string;
}

const PesertaMyCourseCard: React.FC<CourseCardProps> = ({
  id,
  color,
  courseLong,
  courseShort,
}) => {
  const { data: session } = useSession();
  const unenrolConfirmation = useUnenrolConfirmation();
  const successUnenrolCourse = useSuccessUnenrolCourse();
  const unenroll_mutate = useUnenroll("/api/course/enroll-student", "unenroll");

  const handleUnenroll = () => {
    unenroll_mutate.mutate(
      {
        body: {
          course_id: id,
          student_id: session?.userinfo?.role_pk,
        },
      },
      {
        onSuccess: () => {
          successUnenrolCourse.open();
          setTimeout(() => window.location.reload(), 1500);
        },
      }
    );
  };

  const handleUnenrolButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    unenrolConfirmation.open(handleUnenroll);
  };

  return (
    <Link href={`/peserta/courses/${id}`}>
      <div className="pb-5 flex items-center justify-center">
        <div className="h-auto w-96 w-[400px] md:w-[400px] lg:w-[500px] relative bg-white rounded-lg shadow hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <div className="flex">
            <div className={`w-20 h-auto p-3 rounded-l-lg bg-${color}`} />
            <div className="w-6 h-6 relative" />
            <div className="py-4 text-left">
              <span className="text-black text-base font-bold">
                {courseShort}
                <br />
              </span>
              <span className="text-black text-xs font-normal">
                {courseLong}
              </span>
            </div>
            <div className="absolute bottom-2 right-2">
              <button
                onClick={handleUnenrolButton}
                disabled={unenroll_mutate.isPending}
                className={`w-24 h-7 border-2 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 ${unenroll_mutate.isPending
                  ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                  : "bg-transparent border-[#FF9B52] hover:bg-[#FF8227] hover:text-white text-[#FF9B52]"
                  }`}
              >
                {unenroll_mutate.isPending ? (
                  <>
                    <svg className="animate-spin w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Loading
                  </>
                ) : "Unenrol"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PesertaMyCourseCard;
