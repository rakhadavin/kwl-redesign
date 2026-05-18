"use client";
import FeedbackCard from "@/app/components/card/FeedbackCard";
import {
  useGetAuthByStudentIdAndCourseId,
  useGetObjects,
} from "@/app/lib/peserta/useCourses";
import { useParams, useRouter } from "next/navigation";

export default function FeedbackPage() {
  const params = useParams();
  const router = useRouter();
  const course_id = params.id_course;
  const { data } = useGetAuthByStudentIdAndCourseId(
    `/api/course/feedback/student/${course_id}/`,
    "feedbacks"
  );

  console.log(data);
  return (
    // note:  cut the message as preview
    // duplicable: feedback box, back button
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

        <h1 className="flex-1 text-main font-bold text-2xl text-center">
          {data?.course_full_name}
        </h1>
      </div>

      <div className="pt-5 flex flex-col items-center justify-center">
        {/* <h1 className="py-8 text-main font-bold text-2xl text-center">
                    {data?.course_full_name}
                </h1> */}

        {data?.feedbacks.map(
          (
            feedback: {
              id: number;
              student_name: string;
              feedback: string;
              lecturer_name: string;
              topic_name: string;
            },
            index: number
          ) => (
            <div key={index}>
              <FeedbackCard
                course_id={`${course_id}`}
                feedback_id={feedback.id}
                topic={feedback.topic_name}
                sender={feedback.lecturer_name}
                message={feedback.feedback}
              />
            </div>
          )
        )}
      </div>
    </main>
  );
}
