"use client";

import { useSession } from "next-auth/react";
import MainButton from "../components/button/peserta/MainButton";
import MediumCard from "../components/button/peserta/MediumCard";
import { useGetAuth } from "../lib/api/useAuth";
import { useGetObjects } from "../lib/peserta/useCourses";
import ConsentModal from "../components/consent-modal/ConsentModal";
import QuickAccess from "../components/QuickAccess";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useQueries } from "@tanstack/react-query";

export default function PesertaHomePage() {
  const { data: session, status } = useSession();
  const [consentSubmitted, setConsentSubmitted] = useState(false);
  const [carouselPage, setCarouselPage] = useState(0);

  const CARDS_PER_PAGE = 5;
  const FALLBACK_COLORS = [
    "#F9A8BE",
    "#4DB6AC",
    "#5BC5C5",
    "#64C4C4",
    "#FFC453",
  ];

  const { data: enrolledCourses } = useGetAuth(
    "/api/course/student",
    "student-recent-courses",
    false,
    status === "authenticated",
  );

  const allLecturerIds: number[] = enrolledCourses
    ? Array.from(new Set<number>(enrolledCourses.flatMap((c: any) => c.lecturer_team ?? [])))
    : [];

  const lecturerQueries = useQueries({
    queries: allLecturerIds.map((pk) => ({
      queryKey: ["lecturer", pk],
      queryFn: async () => {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/lecturer/${pk}`,
          { headers: { Authorization: `Bearer ${session?.access}` } }
        );
        return data;
      },
      enabled: !!session && allLecturerIds.length > 0,
      staleTime: Infinity,
    })),
  });

  const lecturerMap: Record<number, string> = {};
  for (const q of lecturerQueries) {
    if (q.data) {
      lecturerMap[q.data.id] = q.data.user?.nama_lengkap ?? "Nama Dosen";
    }
  }

  const totalPages = enrolledCourses
    ? Math.ceil(enrolledCourses.length / CARDS_PER_PAGE)
    : 0;
  const visibleCourses = enrolledCourses
    ? enrolledCourses.slice(
        carouselPage * CARDS_PER_PAGE,
        (carouselPage + 1) * CARDS_PER_PAGE,
      )
    : [];

  const { data: consentStatus, isLoading: consentLoading } = useGetAuth(
    "/api/auth/consent/status",
    "consent_status",
    false,
    status === "authenticated",
  );

  const showModal =
    !consentLoading &&
    consentStatus !== undefined &&
    !consentStatus.has_consented &&
    !consentSubmitted;

  const handleConsentConfirm = async (consentIds: number[]) => {
    if (consentIds.length === 0) return;
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/consent/status`,
      { consent_id: consentIds[0] },
      { headers: { Authorization: `Bearer ${session?.access}` } },
    );
    setConsentSubmitted(true);
  };

  return (
    <main className="bg-dark-accent h-72">
      <ConsentModal
        isOpen={showModal}
        onConfirm={handleConsentConfirm}
        onCancel={() => setConsentSubmitted(true)}
      />
      <div className="flex items-center justify-center flex-wrap">
        <div>
          <div className="pt-10 text-center text-lg text-white">
            <span className="font-bold">Selamat datang, &nbsp;</span>
            <span id="nama-peserta">{session?.userinfo.name}</span>
          </div>

          <div className="lg:w-[600px] md:w-[600px] sm:w-[600px]">
            <img src="/kowl-home.png" />
          </div>

          <QuickAccess role="student" />
        </div>

        <div className="my-4 p-8 w-[600px] rounded-lg bg-white shadow">
          <p className="text-sm">
            <span className="text-lg font-bold">Hai!</span>
            <br />
            Di K-owl, kamu akan menjalani petualangan belajar yang seru dengan
            langkah-langkah KWL, yaitu Know, Want to Know, dan Learned.
          </p>

          <div className="my-2 p-4 rounded-xl flex text-left items-center bg-[#D6F3F6]">
            <img src="/know.png" width="54" className="flex-shrink-0" />
            <div className="px-4">
              <h1 className="font-extrabold text-kiki-blue">Know</h1>
              <h2 className="text-sm">
                Pertama, kita mengevaluasi apa yang sudah kamu ketahui tentang
                topik yang akan kita bahas.
              </h2>
            </div>
          </div>

          <div className="my-2 p-4 rounded-xl flex text-left items-center bg-[#FFE0EA]">
            <img src="/wtk.png" width="54" className="flex-shrink-0" />
            <div className="px-4">
              <h1 className="font-extrabold text-wawa-pink">Want to Know</h1>
              <h2 className="text-sm">
                Di sini, kamu untuk menentukan apa yang ingin kamu pelajari
                lebih lanjut tentang topik tersebut.
              </h2>
            </div>
          </div>

          <div className="my-2 p-4 rounded-xl flex text-left items-center bg-[#FFE9CE]">
            <img src="/learned.png" width="54" className="flex-shrink-0" />
            <div className="px-4">
              <h1 className="font-extrabold text-lulu-yellow">Learned</h1>
              <h2 className="text-sm">
                Setelah itu, kita lanjut ke langkah Learned, di mana kita
                mengevaluasi apa yang sudah kamu pelajari.
              </h2>
            </div>
          </div>

          <p className="mt-4 text-sm">
            Dan yang lebih seru lagi, setelah semua itu selesai, poin yang kamu
            dapatkan bisa ditukar dengan berbagai reward menarik! Jadi, ayo
            semangat dan selamat belajar di K-owl!
          </p>

          <div className="my-4 flex justify-center content-center text-center">
            <img src="/birdies.png" width="200" />
          </div>
        </div>
      </div>

      {/* Recent Courses Section */}
      <section className="bg-white px-10 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-dark-accent font-extrabold text-2xl">
            Recent Courses
          </h2>
          <Link
            href="/peserta/mycourses"
            className="text-sm text-gray-400 hover:underline"
          >
            See All Course
          </Link>
        </div>

        {enrolledCourses && enrolledCourses.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {visibleCourses.map((course: any, idx: number) => {
                const color =
                  course.color_theme ||
                  FALLBACK_COLORS[
                    (carouselPage * CARDS_PER_PAGE + idx) %
                      FALLBACK_COLORS.length
                  ];
                const firstLecturerId = course.lecturer_team?.[0];
                const lecturerName =
                  (firstLecturerId && lecturerMap[firstLecturerId]) ??
                  "Nama Dosen";
                return (
                  <Link
                    key={course.id}
                    href={`/peserta/courses/${course.id}`}
                    className="rounded-2xl overflow-hidden shadow-md bg-white flex flex-col"
                  >
                    <div className={`h-40 w-full bg-${color}`} />
                    <div className="p-4 flex flex-col items-center text-center gap-1">
                      <p className="font-extrabold text-base text-dark-accent leading-tight">
                        {course.short_name}
                      </p>
                      <p className="text-sm text-gray-400">{lecturerName}</p>
                      <p className="mt-3 text-sm text-dark-accent">
                        Open This Course
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselPage(i)}
                    className={`w-2.5 h-2.5 rounded-full transition ${
                      i === carouselPage ? "bg-dark-accent" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-gray-400">
            Belum ada kursus yang diikuti.
          </p>
        )}
      </section>
    </main>
  );
}