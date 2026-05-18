"use client";
import WideButton from "@/app/components/button/peserta/WIdeButton";
import PesertaTopicContainer from "@/app/components/card/PesertaTopicContainer";
import {
  useGetObjects,
  useGetObjectsWithStudent,
} from "@/app/lib/peserta/useCourses";
import { useParams, useRouter } from "next/navigation";

import Image from "next/image";

export default function MyCoursesPage() {
  const router = useRouter();
  const id = useParams().id_course;
  const information = useGetObjects(`/api/course/${id}`, "course");
  const { data } = useGetObjectsWithStudent(
    `/api/course/kwl-status/${id}/`,
    "topic"
  );

  const generateLink = (topic: any) => {
    const topicData = topic.topic_data;
    const now = new Date();

    const parseTopicTime = (timeString: string) => {
      if (!timeString) return null;
      const wibTime = timeString.includes("+")
        ? timeString
        : timeString + "+07:00";
      return new Date(wibTime.replace(" ", "T"));
    };

    if (topicData.enable_open_time && topicData.open_time) {
      const openTime = parseTopicTime(topicData.open_time);
      if (openTime && now < openTime) {
        return "/peserta/unavailable";
      }
    }

    if (topicData.enable_close_time && topicData.close_time) {
      const closeTime = parseTopicTime(topicData.close_time);
      if (closeTime && now > closeTime) {
        return `/peserta/courses/${id}/${topicData.id}/poin`;
      }
    }

    if (topicData.is_accessible === false) {
      return "/peserta/unavailable";
    }

    const status =
      topic.kwl_data === "kosong" ? null : topic.kwl_data.kwl_status;
    const know = topicData.know[0];

    if (status === "learned") {
      return `/peserta/courses/${id}/${topicData.id}/poin`;
    } else if (status === "wtk") {
      return `/peserta/courses/${id}/${topicData.id}/class`;
    } else if (status === "know") {
      return `/peserta/courses/${id}/${topicData.id}/kwl/want_to_know/pre_reading`;
    } else if (know) {
      if (know?.type === "reflection") {
        return `/peserta/courses/${id}/${topicData.id}/kwl/know/reflection/${know?.id}`;
      } else if (know?.type === "quiz") {
        return `/peserta/courses/${id}/${topicData.id}/kwl/know/quiz/${know?.id}`;
      }
    }

    return "/peserta/unavailable";
  };

  return (
    <main className="py-5 text-center bg-[url('/bg1.png')] bg-cover min-h-screen">
      {/* Image as background */}
      {/* <Image
        src="/background.png"
        alt="Decorative login page image"
        layout="fill"
        objectFit="cover"
        quality={100}
      /> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="white"
        className="hidden sm:block hidden sm:block w-6 h-6 ml-5 hover:opacity-80 cursor-pointer"
        onClick={router.back}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>

      <div className="flex items-center justify-center mt-8">
        <div className="overflow-y-auto scrollbar-none h-[80vh]  w-[90%] md:w-[80%] lg:w-[40%] relative bg-white rounded-lg shadow p-8">
          <h1 className="py-5 text-main font-bold text-lg text-center">
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

          <h2 className="py-5 text-black font-bold text-xl text-center">
            Courses
          </h2>

          <div className="py-2 mx-2">
            <PesertaTopicContainer
              data={data || []}
              isLoading={!data}
              courseId={id}
              generateLink={generateLink}
              showSearch={true}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
