"use client";

import CourseContent from "@/app/components/forms/CourseContent";
import { useParams, useRouter } from "next/navigation";
import { useGetAuth } from "@/app/lib/api/useAuth";

import useEditCourse2Forms from "@/app/hooks/useEditCourse2Form";
import EditCourse2Forms from "@/app/components/forms/EditCourse2Forms";
import Breadcrumb from "@/app/components/navigation/Breadcrumb";

export default function SettingsPage() {
  const editCourse2Form = useEditCourse2Forms();

  const params = useParams();
  const router = useRouter();

  const { data } = useGetAuth(`/api/course/${params.id_course}`, "course name");

  return (
    <div className="relative">
      <main className="py-5 bg-cover bg-dark-accent min-h-screen bottom-0">
        <Breadcrumb items={[{ label: "Beranda", href: "/courses" }, { label: data?.["short_name"] ?? "...", href: `/courses/${params.id_course}` }, { label: "Pengaturan" }]} />
        <div className="flex items-start">
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
          <h1 className="flex-1 text-main font-bold text-2xl text-center text-white">
            Pengaturan - {data && data["full_name"]}
          </h1>
        </div>

        {/* <div className="flex items-center justify-center fixed inset-0 z-50 bg-black/60">
        <div className="relative w-[400px] md:w-[500px] lg:w-[500px] mx-auto h-auto max-h-[500px] overflow-y-scroll scrollbar-none">
          <div className="w-full h-auto rounded-xl relative flex flex-col bg-white">
            <header className="h-[60px] flex items-center p-6 rounded-t justify-center relative border-b">
              <h2 className="text-lg font-bold text-dark-accent">label</h2>
            </header>
            <section className="m-10">content</section>
          </div>
        </div>
      </div> */}

        {/* <div className="flex items-center justify-center fixed inset-0 z-50 "> */}
        <div className="py-5 flex items-center justify-center">
          <div className="relative w-[500px] md:w-[600px] lg:w-[700px] mx-auto h-auto max-h-[500px]">
            <div className="w-full h-auto rounded-xl relative flex flex-col bg-white">
              <header className="h-[60px] flex items-center p-6 rounded-t justify-center relative border-b">
                <h2 className="text-lg font-bold text-dark-accent">
                  Informasi Umum
                </h2>
              </header>
              <section className="m-10">
                <div className="flex items-center justify-center">
                  <div className="relative w-[400px] md:w-[500px] lg:w-[500px] mx-auto h-auto max-h-[500px] overflow-y-scroll scrollbar-none">
                    <CourseContent />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* <div className="py-5 flex items-center justify-center">
          <div className="relative w-[500px] md:w-[600px] lg:w-[700px] mx-auto h-auto max-h-[500px]">
            <div className="w-full h-auto rounded-xl relative flex flex-col bg-white">
              <header className="h-[60px] flex items-center p-6 rounded-t justify-center relative border-b">
                <h2 className="text-lg font-bold text-dark-accent">
                  Peserta dan Pengajar
                </h2>
              </header>
              <SearchBar />
              <TableParticipant
                isButtonActive={true}
                handleButton={handleAddUser}
              />
            </div>
          </div>
        </div> */}

        <EditCourse2Forms />
      </main>
    </div>
  );
}
