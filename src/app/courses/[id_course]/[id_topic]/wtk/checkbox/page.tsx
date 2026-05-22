"use client";

import CheckBoxCard from "@/app/components/kwl/CheckBoxCard";
import KwlTitle from "@/app/components/kwl/KwlTitle";
import { useGetObjects } from "@/app/lib/peserta/useCourses";
import { useParams } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/app/components/navigation/Breadcrumb";

export default function WantToKnowCheckBox() {
  const params = useParams();
  const id_course = params.id_course;
  const id_topic = params.id_topic;

  // bottleneck potential
  const { data } = useGetObjects(`/api/wtk/poll/${id_topic}`, "wtk");

  const course = useGetObjects(`/api/course/${id_course}`, "course");
  const topic = useGetObjects(`/api/course/topic/${id_topic}`, "topic");
  return (
    <main className="py-5 text-center bg-[url('/bg1.png')] bg-scroll min-h-screen">
      <Breadcrumb items={[{ label: "Beranda", href: "/courses" }, { label: course?.data?.short_name ?? "...", href: `/courses/${id_course}` }, { label: topic?.data?.name ?? "..." }, { label: "WTK" }, { label: "Checkbox" }]} />
      <KwlTitle course={course?.data?.short_name} topic={topic?.data?.name} />

      <CheckBoxCard
        stage="Want to Know"
        topic={topic?.data?.name}
        question={data?.question?.question}
        image="/wtk.png"
        // nextPage={`/courses/${id_course}/${id_topic}/wtk/prereading`}
      />
      <Link href={`/courses/${id_course}/${id_topic}/wtk/prereading`}>
        <button className="text-sm text-white font-bold w-fit py-2 px-6 mt-4 ml-8 shadow text-center bg-green-500 rounded">
          Pre-Reading Material
        </button>
      </Link>
    </main>
  );
}
