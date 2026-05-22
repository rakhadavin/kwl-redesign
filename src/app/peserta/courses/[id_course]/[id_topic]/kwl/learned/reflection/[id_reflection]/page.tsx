"use client";

import KwlTitle from "@/app/components/kwl/KwlTitle";
import ReflectionCard from "@/app/components/kwl/ReflectionCard";
import { useGetObjects } from "@/app/lib/peserta/useCourses";
import { useParams } from "next/navigation";
import Breadcrumb from "@/app/components/navigation/Breadcrumb";

export default function LearnedPageReflection() {
  const params = useParams();
  const id_course = params.id_course;
  const id_topic = params.id_topic;

  const { data, isLoading } = useGetObjects(`/api/learned/essay/${id_topic}`, "learned");

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
      <Breadcrumb items={[
        { label: "Beranda", href: "/peserta" },
        { label: "Kursus", href: `/peserta/courses/${id_course}` },
        { label: course?.data?.short_name ?? "...", href: `/peserta/courses/${id_course}` },
        { label: topic?.data?.name ?? "..." },
        { label: "Learned > Refleksi" },
      ]} />
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
