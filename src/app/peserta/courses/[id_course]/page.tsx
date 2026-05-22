"use client";

import { useState, useEffect } from "react";
import WideButton from "@/app/components/button/peserta/WIdeButton";
import PesertaTopicContainer from "@/app/components/card/PesertaTopicContainer";
import {
  useGetObjects,
  useGetObjectsWithStudent,
  useUnenroll,
} from "@/app/lib/peserta/useCourses";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useUnenrolConfirmation from "@/app/hooks/useUnenrolConfirmation";
import useSuccessUnenrolCourse from "@/app/hooks/useSuccessUnenrolCourse";
import UnenrolConfirmation from "@/app/components/message/UnenrolConfirmation";
import SuccessUnenrolCourse from "@/app/components/message/SuccessUnenrolCourse";
import KWLQuestionTopic from "@/app/components/button/peserta/KWLQuestionTopik";
import Breadcrumb from "@/app/components/navigation/Breadcrumb";

interface Topic {
  topic_data: {
    id: number;
    name: string;
    know: Array<{ id: number; type: string }>;
    wtk: Array<{ id: number; type: string }>;
    learned: Array<{ id: number; type: string }>;
    [key: string]: any;
  };
  kwl_data: { kwl_status: string } | "kosong";
  know: any[];
  wtk: any[];
  learned: any[];
}

export default function MyCoursesPage() {
  const router = useRouter();
  const id = useParams().id_course;
  const { data: session } = useSession();
  const unenrolConfirmation = useUnenrolConfirmation();
  const successUnenrolCourse = useSuccessUnenrolCourse();
  const unenroll_mutate = useUnenroll("/api/course/enroll-student", "unenroll");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);


  const handleUnenroll = () => {
    unenroll_mutate.mutate(
      { body: { course_id: id, student_id: session?.userinfo?.role_pk } },
      {
        onSuccess: () => {
          successUnenrolCourse.open();
          setTimeout(() => router.push("/peserta/mycourses"), 1500);
        },
      }
    );
  };

  const information = useGetObjects(`/api/course/${id}`, "course");
  const { data } = useGetObjectsWithStudent(`/api/course/kwl-status/${id}/`, "topic");
  console.log("DATA Course", information?.data);
  console.log("DATA Topics", data);

  useEffect(() => {
    if (data && data.length > 0 && !selectedTopic) {
      setSelectedTopic(data[0]);
    }
  }, [data, selectedTopic]);

  return (
    <main className="py-5 text-center bg-[url('/bg1.png')] bg-cover min-h-screen">
      <Breadcrumb items={[
        { label: "Beranda", href: "/peserta" },
        { label: "Kursus", href: "/peserta/mycourses" },
        { label: information?.data?.short_name ?? "..." },
      ]} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="white"
        className="hidden sm:block w-6 h-6 ml-5 hover:opacity-80 cursor-pointer"
        onClick={router.back}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
      </svg>

      <div className="flex items-center justify-center mt-8">
        <div className="overflow-y-auto scrollbar-none min-h-full w-full min-w-fit mx-24 relative bg-white rounded-lg shadow p-8">
          <div className="flex items-center justify-end">
            <button
              onClick={() => unenrolConfirmation.open(handleUnenroll)}
              disabled={unenroll_mutate.isPending}
              className={`mt-3 w-32 h-8 border-2 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 ${
                unenroll_mutate.isPending
                  ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                  : "bg-transparent border-[#FF9B52] hover:bg-[#FF8227] hover:text-white text-[#FF9B52]"
              }`}
            >
              {unenroll_mutate.isPending ? (
                <>
                  <svg className="animate-spin w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Loading
                </>
              ) : "Unenrol"}
            </button>
          </div>

          <h1 className="py-5 text-main font-bold text-2xl uppercase text-center">
            {information?.data?.full_name}
          </h1>

          <div className="text-center">
            <WideButton
              name="Tukar Poin"
              icon="/wide_button/button-reward-koko.png"
              accessory="/wide_button/reward_accessory.png"
              url={`/peserta/courses/${id}/reward`}
            />
            <WideButton
              name="Lihat Feedback"
              icon="/wide_button/button-feedback-wawa.png"
              accessory="/wide_button/feedback_accessory.png"
              url={`/peserta/courses/${id}/feedback`}
            />
          </div>

          <h2 className="py-5 text-black font-bold text-xl text-center">Courses</h2>

          <div className="py-2 mx-2 flex flex-row items-start justify-evenly gap-4 " >
            <PesertaTopicContainer
              data={data || []}
              isLoading={!data}
              courseId={id}
              onSelectTopic={setSelectedTopic}
              selectedTopicId={selectedTopic?.topic_data.id}
              showSearch={true}
            />
            <KWLQuestionTopic
              topic={selectedTopic}
            />
          </div>
        </div>
      </div>

      <UnenrolConfirmation />
      <SuccessUnenrolCourse />
    </main>
  );
}
