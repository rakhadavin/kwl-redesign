import React from "react";
import Link from "next/link";
import { useDeleteAuth } from "@/app/lib/api/useAuth";
import useDeleteCourseConfirmation from "@/app/hooks/useDeleteCourseConfirmation";
import useSuccessDeleteCourse from "@/app/hooks/useSuccessDeleteCourse";

interface CourseCardProps {
  id: number;
  courseLong: string;
  courseShort: string;
  color: string;
  disabled?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  color,
  courseLong,
  courseShort,
  disabled = false,
}) => {
  const deleteCourseConfirmation = useDeleteCourseConfirmation();
  const successDeleteCourse = useSuccessDeleteCourse();

  const { mutate: mutateCourse } = useDeleteAuth(
    `/api/course/${id}`,
    "lecturer",
  );

  const handleDeleteCourse = () => {
    mutateCourse({
      onSuccess: () => {},
      onError: () => {},
    });
    successDeleteCourse.open();
  };

  const cardContent = (
    <div
      className={`pb-5 flex items-center justify-center ${disabled ? "opacity-60" : ""}`}
    >
      <div className="h-auto w-96 w-[400px] md:w-[400px] lg:w-[500px] relative bg-white rounded-lg shadow hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
        <div className="flex">
          <div className={`w-20 h-auto p-3 rounded-l-lg bg-${color}`} />
          <div className="w-6 h-6 relative" />
          <div className="py-4 text-left">
            <span className="text-black text-base font-bold">
              {courseShort}
              <br />
            </span>
            <span className="text-black text-xs font-normal">{courseLong}</span>
          </div>
          {
            !disabled && (
              <button className="absolute top-2 right-2 w-5 h-5">
                <svg
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    deleteCourseConfirmation.open(id, () => handleDeleteCourse());
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 hover:opacity-80 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            )
          }
        </div>
      </div>
    </div>
  );

  return disabled ? (
    cardContent
  ) : (
    <Link href={`/courses/${id}`}>{cardContent}</Link>
  );
};

export default CourseCard;
