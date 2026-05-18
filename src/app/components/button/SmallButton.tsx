"use client";

import React from "react";

import useSuccessCreateCourse from "@/app/hooks/useSuccessCreateCourse";
import useSuccessCreateTopic from "@/app/hooks/useSuccessCreateTopic";

interface SmallButtonProps {
  label1: string;
  color1: string;
  label2?: string;
  color2?: string;
  msgmodal: string;
}

const SmallButton: React.FC<SmallButtonProps> = ({
  label1,
  color1,
  label2,
  color2,
  msgmodal,
}) => {
  const successCreateCourse = useSuccessCreateCourse();
  const successCreateTopic = useSuccessCreateTopic();

  return (
    <div className="btn-group">
      <button
        onClick={() => {
          if (msgmodal === "course") {
            successCreateCourse.close();
          } else if (msgmodal === "topic") {
            successCreateTopic.close();
          }
        }}
        className={`mb-2 h-[30px] bg-${color1} border-2 hover:bg-transparent hover:text-${color1} hover:border-${color1} text-white font-bold text-xs py-2 px-2 rounded-xl ${
          label2 ? "w-24 h-7" : "w-fit-content"
        }`}
      >
        {label1}
      </button>

      {label2 && color2 && (
        <button
          className={`mb-2 w-24 h-7 h-[30px] bg-${color2} border-2 hover:bg-transparent hover:text-${color2} hover:border-${color2} text-white font-bold text-xs py-2 px-2 rounded-xl`}
        >
          {label2}
        </button>
      )}
    </div>
  );
};

export default SmallButton;
