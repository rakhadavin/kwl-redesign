"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useGetAuth } from "@/app/lib/api/useAuth";
import WordCloud from "@/app/components/chart/WordCloud";
import Reflection from "@/app/components/card/AnalysisReflectionCard";
import Spinner from "@/app/components/spinner/spinner";
import KwlUnavailablePage from "@/app/components/message/UnavailableMessage";
import Breadcrumb from "@/app/components/navigation/Breadcrumb";


const DetailSubmissionLearnedEssayPage = () => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const newPath = pathname.split("/").slice(0, 5).join("/");

  const { data } = useGetAuth(
    `/api/course/topic/${params.id_topic}`,
    "detail analiisa Learned", true
  );

  const { data: wordCloud, status } = useGetAuth(
    `/api/analysis/wordcloud/learned/${params.id_topic}`,
    "wordcloud learned"
  );

  return (
    <main className="py-5">
      <Breadcrumb items={[{ label: "Beranda", href: "/courses" }, { label: data?.["course_data"]?.["full_name"] ?? "...", href: `/courses/${params.id_course}` }, { label: "Analisis", href: `/courses/${params.id_course}/analisis` }, { label: data?.["name"] ?? "...", href: `/courses/${params.id_course}/analisis/${params.id_topic}` }, { label: "Learned" }, { label: "Refleksi" }]} variant="light" />
      <div className="flex items-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6 ml-5 text-main hover:opacity-80 cursor-pointer"
          onClick={router.back}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>

        <div className="flex-1">
          <h1 className=" text-main font-bold text-2xl text-center">
            {data && data["course_data"]["full_name"]}
          </h1>
          <h2 className="pb-5 text-main text-l text-center">
            {data && data["name"]}
          </h2>
        </div>
      </div>

      {status === "success" ? (
        <div>
          <div className="flex justify-center items-center mb-8">
            {wordCloud?.image_url && (
              <WordCloud image_url={wordCloud.image_url} />
            )}
          </div>

          <Link href={`${newPath}/submisi_individu`}>
                <div className="flex justify-center">
                  <button className="w-[30%] mt-8 mb-1 bg-dark-accent border-2 hover:bg-white hover:text-dark-accent hover:border-dark-accent text-white font-bold text-xs py-2 px-2 rounded-xl">
                    lihat submisi individu
                  </button>
                </div>
              </Link>

          <div className="py-5 flex flex-col flex-grow justify-center items-center">
            <div className="w-[500px] md:w-[600px] lg:w-[700px] mx-auto h-auto max-h-[500px]">
              <p className="text-center pb-10 pt-5 font-medium">
                {/* {question} */}
              </p>

              {wordCloud?.reflections?.length > 0 ? (
                wordCloud.reflections.map((reflection: any) => (
                  <Reflection
                    key={reflection.id}
                    username={reflection[0]}
                    reflection={reflection[1]}
                  />
                ))
              ) : (
                <div>No reflections have been filled out by the students yet.</div>
              )}

            </div>
          </div>
        </div>
      ) : status === "error" ? (
        <KwlUnavailablePage
          title="Analisis belum tersedia"
          message="Belum ada mahasiswa yang mengisi Learned."
          image="/sad_kowl.png"
        />
      ) : <>
        <Spinner />
      </>
      }
    </main>
  );
};

export default DetailSubmissionLearnedEssayPage;

