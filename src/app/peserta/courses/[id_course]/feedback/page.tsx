"use client";
import FeedbackCard from "@/app/components/card/FeedbackCard";
import {
  useGetAuthByStudentIdAndCourseId,
  useGetObjects,
} from "@/app/lib/peserta/useCourses";
import { useParams, useRouter } from "next/navigation";
import Breadcrumb from "@/app/components/navigation/Breadcrumb";

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
      <Breadcrumb variant="light" items={[
        { label: "Beranda", href: "/peserta" },
        { label: "Kursus", href: "/peserta/mycourses" },
        { label: data?.course_full_name ?? "...", href: `/peserta/courses/${course_id}` },
        { label: "Feedback" },
      ]} />
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
        {data?.feedbacks?.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
            <p className="text-gray-400 font-semibold text-lg">Belum ada feedback</p>
            <p className="text-gray-300 text-sm">Dosen belum memberikan feedback untuk kamu di course ini.</p>
          </div>
        ) : (
          data?.feedbacks.map(
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
          )
        )}
      </div>
    </main>
  );
}
