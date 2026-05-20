"use client";
import React from "react";
import { useRouter } from "next/navigation";
import useSuccessEnrolCourse from "@/app/hooks/useSuccessEnrolCourse";

const SuccessEnrolCourse = () => {
  const successEnrolCourse = useSuccessEnrolCourse();
  const router = useRouter();

  if (!successEnrolCourse.isOpen) return null;

  const handleStay = () => {
    successEnrolCourse.close();
    window.location.reload();
  };

  const handleGoCourse = () => {
    successEnrolCourse.close();
    router.push(`/peserta/courses/${successEnrolCourse.courseId}`);
  };

  return (
    <div className="flex items-center justify-center fixed inset-0 z-50 bg-black/60">
      <div className="w-72 p-4 bg-white rounded-2xl shadow flex flex-col items-center gap-4">
        <p className="pt-2 text-center text-black text-xs font-normal">
          Enrolment berhasil! Selamat belajar!
        </p>
        <div className="flex flex-row gap-3 pb-1">
          <button
            onClick={handleStay}
            className="w-28 h-[30px] border-2 border-yellow-accent text-yellow-accent font-bold text-xs rounded-xl hover:bg-yellow-accent/20 transition-colors"
          >
            Tetap di sini
          </button>
          <button
            onClick={handleGoCourse}
            className="w-28 h-[30px] border-2 bg-green-accent border-green-accent text-white font-bold text-xs rounded-xl hover:brightness-90 transition-colors"
          >
            Ke Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessEnrolCourse;
