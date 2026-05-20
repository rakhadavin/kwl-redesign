"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useSuccessCreateCourse from "@/app/hooks/useSuccessCreateCourse";

const SuccessCreateCourse = () => {
  const { isOpen, createdCourseId, close } = useSuccessCreateCourse();
  const router = useRouter();

  if (!isOpen) return null;

  const handleAllCourses = () => {
    close();
    router.push("/mycourses");
  };

  const handleViewCourse = () => {
    close();
    router.push(`/courses/${createdCourseId}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 flex flex-col items-center gap-4">
        <div className="text-center">
          <p className="text-sm font-bold text-gray-800">Course berhasil dibuat!</p>
          <p className="text-xs text-gray-500 mt-1">Apakah Anda ingin melihat detailnya?</p>
        </div>
        <div className="flex gap-3 w-full">
          <button
            onClick={handleAllCourses}
            className="flex-1 h-9 border-2 border-main text-main font-bold text-xs rounded-xl hover:bg-main/10 hover:text-main transition-colors"
          >
            Tidak, tetap disini
          </button>
          <button
            onClick={handleViewCourse}
            className="flex-1 h-9 bg-[#40A964] text-white font-bold text-xs rounded-xl hover:brightness-90 transition-colors"
          >
            Lihat Detail Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessCreateCourse;
