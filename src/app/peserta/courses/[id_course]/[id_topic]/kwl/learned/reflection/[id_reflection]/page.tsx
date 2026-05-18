"use client";

import KwlTitle from "@/app/components/kwl/KwlTitle";
import ReflectionCard from "@/app/components/kwl/ReflectionCard";
import { useGetObjects } from "@/app/lib/peserta/useCourses";
import { useParams } from "next/navigation";

export default function LearnedPageReflection() {
  const params = useParams();
  const id_course = params.id_course;
  const id_topic = params.id_topic;

  const { data } = useGetObjects(`/api/learned/essay/${id_topic}`, "learned");

  const course = useGetObjects(`/api/course/${id_course}`, "course");
  const topic = useGetObjects(`/api/course/topic/${id_topic}`, "topic");

  return (
    <main className="py-5 text-center bg-[url('/bg1.png')] bg-scroll bg-cover min-h-screen">
      <KwlTitle course={course?.data?.short_name} topic={topic?.data?.name} />

      <ReflectionCard
        stage="Learned"
        code="learned"
        topic={topic?.data?.name}
        question={data?.question}
        instruction="Hal yang sudah saya pelajari tentang topik ini meliputi..."
        image="/learned.png"
        nextPage={`/peserta/courses/${id_course}/${id_topic}/poin`}
      />
    </main>
  );
}
