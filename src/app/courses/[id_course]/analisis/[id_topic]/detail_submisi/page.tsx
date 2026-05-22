"use client";

import React from "react";
import SearchBar from "@/app/components/button/SearchBar";
import TableParticipant from "@/app/components/courseDetail/TableParticipant";
import { useRouter, usePathname, useParams } from "next/navigation";
import Link from "next/link";
import { useGetAuth } from "@/app/lib/api/useAuth";
import Breadcrumb from "@/app/components/navigation/Breadcrumb";
// import { usePathname } from "next/navigation";

// import css from "../globals.css";
// import css from "../styles.css"
// import "../globals.css";

const AnalyzeSubmissionPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const { data } = useGetAuth(`/api/course/topic/${params.id_topic}`, "topic");

  const knowType = data?.["know"]?.[0]?.["type"];
  const wtkType = data?.["wtk"]?.[0]?.["type"];
  const learnedType = data?.["learned"]?.[0]?.["type"];

  return (
    <div>
      <main className="py-5 bg-cover bg-[url('/bg2.png')] bg-scroll bg-cover min-h-screen">
        <Breadcrumb items={[{ label: "Beranda", href: "/courses" }, { label: data?.["course_data"]?.["full_name"] ?? "...", href: `/courses/${params.id_course}` }, { label: "Analisis", href: `/courses/${params.id_course}/analisis` }, { label: data?.["name"] ?? "..." }, { label: "Detail Submisi" }]} />
        {/* <main className="py-5 "> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="white"
          className="hidden sm:block w-6 h-6 ml-5 hover:opacity-80 cursor-pointer"
          onClick={router.back}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <div className="py-5 flex items-center justify-center">
          <div className="relative w-[500px] md:w-[600px] lg:w-[700px] mx-auto h-auto max-h-[500px]">
            <div className="w-full h-auto rounded-xl relative flex flex-col bg-white">
              <header className="flex items-center p-6 pb-5 rounded-t justify-center relative border-b">
                <div className="text-center">
                  <h2 className="text-lg font-bold text-dark-accent">
                    Analisis Submisi
                  </h2>
                  <h3 className="text-sm text-dark-accent">
                    Pilih Tipe Submisi
                  </h3>
                </div>
              </header>
              {/* <PGContent handleNext={handleNext} labelButton="simpan" /> */}
              {/* <SearchBar /> */}
              {/* <TableParticipant isButtonActive={true} /> */}
              <section className="m-2">
                <div className="flex items-center justify-center">
                  <div className="relative w-[400px] md:w-[500px] lg:w-[500px] mx-auto h-auto ">
                    <div className="items-center justify-center pt-3 mx-auto">
                      {/* know */}
                      <Link href={`${pathname}/know/${knowType}`}>
                        <button
                          className={`my-2 px-5 py-2 h-auto w-96 w-[400px] md:w-[400px] lg:w-[500px] relative bg-white rounded-lg shadow shadow-xl ${
                            knowType === undefined
                              ? "hover:opacity-50 opacity-50 cursor-not-allowed"
                              : "hover:opacity-80"
                          }`}
                          disabled={knowType === undefined}
                        >
                          <div className="my-1 pr-2 rounded justify-start items-center">
                            <div className="w-56 h-12 relative">
                              <div className="left-[75px] top-[15px] absolute text-black text-xs font-bold hover:underline">
                                Know
                              </div>
                              <div className="w-12 h-12 left-0 top-0 absolute bg-blue-900" />
                              <div className="absolute inline-flex left-0 top-0">
                                <img className="w-12 h-12" src="/know.png" />
                              </div>
                            </div>
                          </div>
                        </button>
                      </Link>
                      {/* wtk */}
                      <Link href={`${pathname}/wtk/${wtkType}`}>
                        <button
                          className={`my-2 px-5 py-2 h-auto w-96 w-[400px] md:w-[400px] lg:w-[500px] relative bg-white rounded-lg shadow shadow-xl ${
                            wtkType === undefined
                              ? "hover:opacity-50 opacity-50 cursor-not-allowed"
                              : "hover:opacity-80"
                          }`}
                          disabled={wtkType === undefined}
                        >
                          <div className="my-1 pr-2 rounded justify-start items-center">
                            <div className="w-56 h-12 relative">
                              <div className="left-[75px] top-[15px] absolute text-black text-xs font-bold hover:underline">
                                Want to Know
                              </div>
                              <div className="w-12 h-12 left-0 top-0 absolute bg-blue-900" />
                              <div className="absolute inline-flex left-0 top-0">
                                <img className="w-12 h-12" src="/wtk.png" />
                              </div>
                            </div>
                          </div>
                        </button>
                      </Link>
                      {/* learned */}
                      <Link href={`${pathname}/learned/${learnedType}`}>
                        <button
                          className={`my-2 px-5 py-2 h-auto w-96 w-[400px] md:w-[400px] lg:w-[500px] relative bg-white rounded-lg shadow shadow-xl ${
                            learnedType === undefined
                              ? "hover:opacity-50 opacity-50 cursor-not-allowed"
                              : "hover:opacity-80"
                          }`}
                          disabled={learnedType === undefined}
                        >
                          <div className="my-1 pr-2 rounded justify-start items-center">
                            <div className="w-56 h-12 relative">
                              <div className="left-[75px] top-[15px] absolute text-black text-xs font-bold hover:underline">
                                Learned
                              </div>
                              <div className="w-12 h-12 left-0 top-0 absolute bg-blue-900" />
                              <div className="absolute inline-flex left-0 top-0">
                                <img className="w-12 h-12" src="/learned.png" />
                              </div>
                            </div>
                          </div>
                        </button>
                      </Link>
                    </div>
                    {/* <CourseContent label="simpan" handleNext={handleNext} /> */}
                  </div>
                </div>
                {/* <PGContent handleNext={handleNext} labelButton="simpan" /> */}
                {/* <button id="width-btn-2">simpan</button> */}
              </section>
            </div>
          </div>
        </div>
        {/* <SearchBar />
        <TableParticipant isButtonActive={false} /> */}
      </main>
    </div>
  );
};

export default AnalyzeSubmissionPage;
