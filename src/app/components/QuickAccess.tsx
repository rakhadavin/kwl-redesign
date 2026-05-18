"use client";

import MainButton from "./button/peserta/MainButton";

interface QuickAccessProps {
  role: "student" | "lecturer";
}

export default function QuickAccess({ role }: QuickAccessProps) {
  return (
   <div className={`${role === "student" ? "lg:w-[400px]" : "lg:w-[700px]"}`}>
      <div className="flex items-center gap-x-2 mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-dark-accent"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
          />
        </svg>
        <h2 className="text-indigo-800 font-extrabold text-xl">Quick access</h2>
      </div>

      {role === "student" ? (
        <>
          <div className="flex items-center justify-center">
            <MainButton
              source="/main_button/lala-course.png"
              link="/peserta/mycourses"
              name="My Courses"
            />

            <MainButton
              source="/main_button/wawa-course.png"
              link="/peserta/courses"
              name="All Courses"
            />

            <MainButton
              source="/main_button/koko-faq.png"
              link="/peserta/faq"
              name="FAQ"
            />
          </div>

          <button className="mt-3 w-full bg-indigo-800 hover:bg-indigo-700 transition text-white font-extrabold text-2xl tracking-widest py-5 rounded-2xl shadow">
            JOIN THE GAME
          </button>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <MainButton
            source="/main_button/lala-course.png"
            link="/courses"
            name="My Courses"
          />

          <MainButton
            source="/main_button/wawa-course.png"
            link="/kuesioner"
            name="My Kuesioner"
          />

          <MainButton
            source="/main_button/koko-faq.png"
            link="/faq"
            name="FAQ"
          />

          <MainButton
            source="/main_button/koko-faq.png"
            link="/daftar-mahasiswa"
            name="Daftar Mahasiswa"
          />

          <MainButton
            source="/main_button/wawa-course.png"
            link="/kuesioner/create"
            name="Buat Kuesioner"
          />
        </div>
      )}
    </div>
  );
}
