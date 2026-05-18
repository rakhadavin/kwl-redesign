"use client";

import KwlTitle from "@/app/components/kwl/KwlTitle";
import ReflectionCard from "@/app/components/kwl/ReflectionCard";
import MessageModal from "@/app/components/modals/MessageModal";
import Modal from "@/app/components/modals/peserta/Modal";
import { useGetObjects } from "@/app/lib/peserta/useCourses";
import { useParams } from "next/navigation";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function KnowPageReflection() {
  const params = useParams();
  const id_course = params.id_course;
  const id_topic = params.id_topic;

  console.log(params);

  const { data } = useGetObjects(`/api/know/essay/${id_topic}`, "know");

  // bottleneck potential
  const course = useGetObjects(`/api/course/${id_course}`, "course");
  const topic = useGetObjects(`/api/course/topic/${id_topic}`, "topic");

  //const [Backopen, setBackOpen] = useState(false)
  //const [Nextopen, setNextOpen] = useState(false)

  return (
    <main className="py-5 text-center bg-[url('/bg1.png')] bg-scroll bg-cover min-h-screen">
      <KwlTitle course={course?.data?.short_name} topic={topic?.data?.name} />
      <ReflectionCard
        stage="Know"
        code="know"
        topic={topic?.data?.name}
        question={data?.question}
        instruction="Hal yang saya ketahui tentang topik ini meliputi..."
        image="/know.png"
        nextPage={`/peserta/courses/${id_course}/${id_topic}/kwl/want_to_know/pre_reading`}
        //prev={setBackOpen(true)}
        //next={setNextOpen(true)}
      />
    </main>
  );
}
