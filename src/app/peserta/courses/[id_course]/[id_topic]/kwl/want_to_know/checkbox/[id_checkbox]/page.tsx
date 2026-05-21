"use client";

import CheckBoxCard from "@/app/components/kwl/CheckBoxCard";
import KwlTitle from "@/app/components/kwl/KwlTitle";
import { useGetObjects } from "@/app/lib/peserta/useCourses";
import { useParams } from "next/navigation";

export default function WantToKnowCheckBox() {
  const params = useParams();
  const id_course = params.id_course;
  const id_topic = params.id_topic;

  // bottleneck potential
  const { data, isLoading } = useGetObjects(`/api/wtk/poll/${id_topic}`, "wtk");

  const course = useGetObjects(`/api/course/${id_course}`, "course");
  const topic = useGetObjects(`/api/course/topic/${id_topic}`, "topic");

  if (isLoading || !data) {
    return (
      <main className="py-5 text-center bg-[url('/bg1.png')] bg-cover min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <p className="text-white text-sm">Memuat soal...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="py-5 text-center bg-[url('/bg1.png')] bg-scroll bg-cover min-h-screen">
      <KwlTitle course={course?.data?.short_name} topic={topic?.data?.name} />

      <CheckBoxCard
        stage="Want to Know"
        topic={topic?.data?.name}
        question={data?.question?.question}
        image="/wtk.png"
        nextPage={`/peserta/courses/${id_course}/${id_topic}/class`}
      />
    </main>
  );
}
