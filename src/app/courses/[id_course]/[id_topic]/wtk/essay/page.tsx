"use client";

import KwlTitle from "@/app/components/kwl/KwlTitle";
import ReflectionCard from "@/app/components/kwl/ReflectionCard";
import { useGetObjects } from "@/app/lib/peserta/useCourses";
import { useParams } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/app/components/navigation/Breadcrumb";

export default function WantToKnowReflection() {
  const params = useParams();
  const id_course = params.id_course;
  const id_topic = params.id_topic;

  const { data } = useGetObjects(`/api/wtk/essay/${id_topic}`, "wtk");

  const course = useGetObjects(`/api/course/${id_course}`, "course");
  const topic = useGetObjects(`/api/course/topic/${id_topic}`, "topic");

  return (
    <main className="py-5 text-center bg-[url('/bg1.png')] bg-scroll bg-cover min-h-screen">
      <Breadcrumb items={[{ label: "Beranda", href: "/courses" }, { label: course?.data?.short_name ?? "...", href: `/courses/${id_course}` }, { label: topic?.data?.name ?? "..." }, { label: "WTK" }, { label: "Essay" }]} />
      <KwlTitle course={course?.data?.short_name} topic={topic?.data?.name} />

      <ReflectionCard
        stage="Want to Know"
        code="wtk"
        topic={topic?.data?.name}
        question={data?.question}
        instruction="Hal yang ingin saya ketahui tentang topik ini meliputi..."
        image="/wtk.png"
        // nextPage={`/peserta/courses/${id_course}/${id_topic}/class`}
      />

      <Link href={`/courses/${id_course}/${id_topic}/wtk/prereading`}>
        <button className="text-sm text-white font-bold w-fit py-2 px-6 mt-4 ml-8 shadow text-center bg-green-500 rounded">
          Pre-Reading Material
        </button>
      </Link>
    </main>
  );
}
