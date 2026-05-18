"use client";

import React from "react";
import MainButton from "./peserta/MainButton";

interface CourseDetailButtonProps {
  courseId: string | string[];
}

const CourseDetailButton: React.FC<CourseDetailButtonProps> = ({
  courseId,
}) => {
  return (
    <div className="lg:w-[400px] mx-auto">

      <div className="flex items-center justify-center">
        <MainButton
          source="/settings.png"
          link={`/courses/${courseId}/settings`}
          name="Pengaturan"
        />
        <MainButton
          source="/analyze.png"
          link={`/courses/${courseId}/analisis`}
          name="Analisis"
        />
        <MainButton
          source="/rewards.png"
          link={`/courses/${courseId}/rewards`}
          name="Rewards"
        />
      </div>
    </div>
  );
};

export default CourseDetailButton;
