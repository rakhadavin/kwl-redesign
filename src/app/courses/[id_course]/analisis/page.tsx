"use client";

import React from "react";
import SearchBar from "@/app/components/button/SearchBar";
import { useGetAuth } from "@/app/lib/api/useAuth";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/app/components/navigation/Breadcrumb";

const AnalyzePage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const { data: course } = useGetAuth(
    `/api/course/${params.id_course}`,
    "analisis course"
  );

  const { data: topics } = useGetAuth(
    `/api/course/topic/${params.id_course}/all`,
    "list topic"
  );

  return (
    <div>
      <main className="py-5 bg-cover bg-[url('/bg2.png')] bg-scroll min-h-screen pb-44">
        <Breadcrumb items={[{ label: "Beranda", href: "/courses" }, { label: course?.["full_name"] ?? "...", href: `/courses/${params.id_course}` }, { label: "Analisis" }]} />
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
        <div className="py-5 flex items-center justify-center">
          <div className="relative w-[500px] md:w-[600px] lg:w-[700px] mx-auto h-auto max-h-[500px]">
            <div className="w-full h-auto rounded-xl relative flex flex-col bg-white">
              <header className="flex items-center p-6 pb-5 rounded-t justify-center relative border-b">
                <div className="text-center">
                  <h2 className="text-lg font-bold text-dark-accent">
                    Analisis Performa Kelas
                  </h2>
                  <h3 className="text-sm text-dark-accent">
                    {course && course["full_name"]}
                  </h3>
                </div>
              </header>
              <section className="m-10">
                <div className="flex items-center justify-center">
                  <div className="relative w-[400px] md:w-[500px] lg:w-[500px] mx-auto h-auto ">
                    <div className="items-center justify-center py-2 pt-3">
                      {/* card topic */}
                      {topics?.map((topic:any) => (
                        <Link href={`${pathname}/${topic["id"]}`}>
                          <div className="py-5 my-5 pb-5 px-8 h-auto w-96 w-[400px] md:w-[400px] lg:w-[500px] relative bg-white rounded-lg shadow">
                            <h1 className="font-bold text-base">
                              {topic["name"]}
                            </h1>
                            <p className="text-sm">{topic["description"]}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyzePage;
