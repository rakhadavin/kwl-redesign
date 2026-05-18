"use client";
import React from "react";
import Link from "next/link";
import { useDeleteAuth, usePostAuth, usePutAuth } from "@/app/lib/api/useAuth";
import { useSession } from "next-auth/react";
import { on } from "events";
import { useUnenroll } from "@/app/lib/peserta/useCourses";
import { useRouter } from "next/navigation";

import useEnrolConfirmation from "@/app/hooks/useEnrolConfirmation";
import useSuccessEnrolCourse from "@/app/hooks/useSuccessEnrolCourse";
import useUnenrolConfirmation from "@/app/hooks/useUnenrolConfirmation";
import useSuccessUnenrolCourse from "@/app/hooks/useSuccessUnenrolCourse";
import Spinner from "../spinner/spinner";
import useEnrolKeyConfirmation from "@/app/hooks/useEnrolKeyConfirmation";

interface PesertaCourseCardProps {
  id: number;
  courseLong: string;
  courseShort: string;
  color: string;
  isEnrolled?: boolean;
  hasEnrollmentKey?: boolean;
}

type Enroll = {
  course_id: number;
  student_id: number;
};

const PesertaCourseCard: React.FC<PesertaCourseCardProps> = ({
  id,
  color,
  courseLong,
  courseShort,
  isEnrolled,
  hasEnrollmentKey
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const enroll_mutate = usePostAuth("/api/course/enroll-student", "enroll");
  const unenroll_mutate = useUnenroll("/api/course/enroll-student", "unenroll");

  const enrolConfirmation = useEnrolConfirmation();
  const successEnrolCourse = useSuccessEnrolCourse();
  const unenrolConfirmation = useUnenrolConfirmation();
  const successUnenrolCourse = useSuccessUnenrolCourse();
  const enrolKeyConfirmation = useEnrolKeyConfirmation();

  const handleEnrolButton = () => {
    if (!hasEnrollmentKey) {
      enrolConfirmation.open(handleEnroll);
    } else {
      enrolKeyConfirmation.open(id, session?.userinfo.role_pk as number);
    }
  };

  const handleUnenrolButton = () => {
    unenrolConfirmation.open(handleUnenroll);
  };

  const handleEnroll = async () => {
    const body: Enroll = {
      course_id: id,
      student_id: session?.userinfo.role_pk as number,
    };
    enroll_mutate.mutate(
      { body: body },
      {
        onSuccess: () => {
          successEnrolCourse.open();
        },
        onError(error: any) {
        },
      }
    );
  };

  const handleClick = () => {
    if (isEnrolled) {
      router.push(`/peserta/courses/${id}`);
    } else {
      alert("You need to enroll first");
    }
  };

  const handleUnenroll = async () => {
    const body: Enroll = {
      course_id: id,
      student_id: session?.userinfo.role_pk as number,
    };
    unenroll_mutate.mutate(
      { body: body },
      {
        onSuccess: () => {
          successUnenrolCourse.open();
        },
        onError(error: any) {
        },
      }
    );
  };

  if (!session) {
    return <div>
      <Spinner/>
    </div>;
  }

  return (
    <div className="pb-5 flex items-center justify-center">
      <div className="h-auto w-96 w-[400px] md:w-[400px] lg:w-[500px] relative bg-white rounded-lg shadow hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
        <div className="flex relative">
          <div className={`w-20 h-auto p-3 rounded-l-lg bg-${color}`} />
          <div className="w-6 h-6 relative" />
          <button className="py-4 text-left" onClick={handleClick}>
            <span className="text-left text-black text-base font-bold">
              {courseShort} {isEnrolled}
              <br />
            </span>
            <span className="text-black text-xs font-normal">{courseLong}</span>
          </button>
          {isEnrolled ? (
            <div className="absolute bottom-1 right-3">
              <button
                onClick={handleUnenrolButton}
                className="mb-2 w-28 h-8 bg-transparent border-2 border-main hover:bg-main hover:text-white hover:border-main text-main font-bold text-xs py-2 px-2 rounded-xl"
              >
                unenrol
              </button>
            </div>
          ) : (
            <div className="absolute bottom-1 right-3">
              <button
                onClick={handleEnrolButton}
                className="mb-2 w-28 h-8 bg-main border-2 border-white hover:bg-white hover:text-main hover:border-main text-white font-bold text-xs py-2 px-2 rounded-xl"
              >
                enrol
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PesertaCourseCard;
