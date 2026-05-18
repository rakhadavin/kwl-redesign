"use client";

import React from "react";

import useCreateCourseForms from "@/app/hooks/useCreateCourseForms";
import useCreateTopicForms from "@/app/hooks/useCreateTopicForms";
import useAddRewardsForms from "@/app/hooks/useAddRewards";
import useCreateQuizForms from "@/app/hooks/useCreateKuesionerForms";

interface AddCourseButtonProps {
  add: string;
  topicName?: string;
}

const AddCourseButton: React.FC<AddCourseButtonProps> = ({ add }) => {
  const createCourseForms = useCreateCourseForms();
  const createTopicForms = useCreateTopicForms();
  const AddRewardsForms = useAddRewardsForms();
  const CreateQuizForms = useCreateQuizForms();

  return (
    <div>
      <button
        onClick={() => {
          if (add === "course") {
            createCourseForms.open();
          } else if (add === "topic") {
            createTopicForms.open();
          } else if (add === "rewards") {
            AddRewardsForms.open();
          } else if (add === "quiz") {
            CreateQuizForms.open();
          }
        }}
        className="fixed float-end bottom-12 right-8 text-white py-4 rounded hover:opacity-80 m-2 z-10"
      >
        <img
          src="/add-button.png"
          alt="add-button"
          width={add === "quiz" ? 24 : 35}
          height={add === "quiz" ? 24 : 35}
        ></img>
      </button>
    </div>
  );
};

export default AddCourseButton;
