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
  const { data } = useGetObjects(`/api/wtk/poll/${id_topic}`, "wtk");

  const course = useGetObjects(`/api/course/${id_course}`, "course");
  const topic = useGetObjects(`/api/course/topic/${id_topic}`, "topic");

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
