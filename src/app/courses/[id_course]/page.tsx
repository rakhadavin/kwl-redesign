"use client";

import SearchBar from "@/app/components/button/SearchBar";
import CreateTopicForms from "@/app/components/forms/CreateTopicForms";
import TopicCard from "@/app/components/card/TopicCard";
import CreateQuizModal from "@/app/components/quiz/CreateQuizModal";
import ChooseKnowType from "@/app/components/quiz/ChooseKnowType";
import ChooseWTKType from "@/app/components/quiz/ChooseWTKType";
import ChooseLearnedType from "@/app/components/quiz/ChooseLearnedType";
import PreReadingMaterialForms from "@/app/components/forms/PreReadingMaterialForms";
import CreateEssayWTKForms from "@/app/components/forms/CreateEssayWTKForms";
import CreateEssayKnowForms from "@/app/components/forms/CreateEssayKnowForms";
import CreateEssayLearnedForms from "@/app/components/forms/CreateEssayLearned";
import CreatePGKnowForms from "@/app/components/forms/CreatePGKnowForms";
import CreateCheckboxWTKForms from "@/app/components/forms/CreateCheckboxWTK";
import CreatePGLearnedForms from "@/app/components/forms/CreatePGLearnedForms";
import TopicContainer from "@/app/components/card/TopicContainer";
import CourseDetailButton from "@/app/components/button/CourseDetailButton";
import useCreateTopicForms from "@/app/hooks/useCreateTopicForms";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import EditEssayKnowForms from "@/app/components/forms/EditEssayKnowForms";
import DeleteTopicConfirmation from "@/app/components/message/DeleteTopicConfirmation";
import DeleteKWLConfirmation from "@/app/components/message/DeleteKWLConfirmation";
import EditEssayLearnedForms from "@/app/components/forms/EditEssayLearnedForms";
import EditEssayWTKForms from "@/app/components/forms/EditEssayWTKForms";
import EditCheckboxWTKForms from "@/app/components/forms/EditCheckboxWTKForms";
import EditPGKnowForms from "@/app/components/forms/EditPGKnowForms";
import EditPGLearnedForms from "@/app/components/forms/EditPGLearnedForms";
import { useGetAuth, useDeleteAuth } from "@/app/lib/api/useAuth";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import EditPreReadingMaterialForms from "@/app/components/forms/EditPreReadingMaterialForms";
import HideTopicConfirmation from "@/app/components/message/HideTopicConfirmation";
import ArchiveTopicConfirmation from "@/app/components/message/ArchiveTopicConfirmation";
import TopicDetailsContainer from "@/app/components/card/TopicDetailsContainer";
import Breadcrumb from "@/app/components/navigation/Breadcrumb";

export default function MyCoursesPage() {
  const params = useParams();
  const router = useRouter();
  const { data, error } = useGetAuth(`/api/course/${params.id_course}`, "course name");
  const createTopicForms = useCreateTopicForms();
  const [selectedTopicId, setSelectedTopicId] = useState<number | undefined>(undefined);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { mutate: deleteCourse, isPending: isDeleting } = useDeleteAuth(
    `/api/course/`,
    "delete-course"
  );

  useEffect(() => {
    const saved = sessionStorage.getItem(`selectedTopicId_${params.id_course}`);
    if (saved) setSelectedTopicId(Number(saved));
  }, [params.id_course]);

  const handleSelectTopic = (id: number | undefined) => {
    setSelectedTopicId(id);
    const key = `selectedTopicId_${params.id_course}`;
    if (id !== undefined) sessionStorage.setItem(key, String(id));
    else sessionStorage.removeItem(key);
  };

  return (
    <main className="py-5">
      <Breadcrumb items={[{ label: "Beranda", href: "/courses" }, { label: data?.["short_name"] ?? "..." }]} variant="light" />
      <div className="relative flex flex-col w-full align-middle justify-center items-center gap-2 pb-5">
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="absolute top-0 right-4 px-4 py-1.5 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-xs font-bold rounded-lg transition-colors"
        >
          Hapus Course
        </button>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="hidden sm:block w-6 h-6 ml-5 text-main hover:opacity-80 cursor-pointer"
          onClick={router.back}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg> */}
        <h1 className="flex-1 text-main font-bold text-2xl text-center">
          {data && data["short_name"]}
        </h1>

        <p className="text-gray-300">{data && data["full_name"]}</p>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-800">Hapus Course?</h2>
            <p className="text-sm text-gray-500">
              Course <span className="font-semibold text-gray-700">{data?.["short_name"]}</span> akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3 justify-end mt-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() =>
                  deleteCourse(
                    { key: params.id_course },
                    {
                      onSuccess: () => router.push("/courses"),
                    }
                  )
                }
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50"
              >
                {isDeleting ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}

      <CourseDetailButton courseId={params.id_course} />

      <Link href={`/courses/${params.id_course}/participants`}>
        <div className="flex justify-center my-4">
          <div className="flex flex-col align-middle items-center">

            <p className="text-gray-400 font-light mb-2 ">Berikan Feedback Mahasiswa </p>

            <div className="flex justify-center items-center px-2 py-2 bg-white rounded-2xl shadow border-2 border-dark-accent w-[400px] hover:shadow-md transition cursor-pointer">
              {/* <img src="/participant_button/btn1.png" width="40" /> */}
              <span className="text-dark-accent text-center font-bold text-lg">Daftar Mahasiswa</span>
            </div>
          </div>
        </div>
      </Link>

      <h2 className="py-5 text-black font-bold text-xl text-center">Topics</h2>
      <div className="flex md:flex-row flex-col items-start align-middle justify-center gap-4  px-12 ">


        {/* Topic Container */}
        <TopicContainer
          showAddButton={true}
          onAddTopic={() => createTopicForms.open()}
          selectedTopicId={selectedTopicId}
          onSelectTopic={handleSelectTopic}
        />
        {/* Detail Topic Container */}
        <TopicDetailsContainer topicId={selectedTopicId} />


      </div>
      <ChooseKnowType />
      <ChooseWTKType />
      <ChooseLearnedType />
      <PreReadingMaterialForms />
      <CreateEssayWTKForms />
      <CreateEssayKnowForms />
      <CreateEssayLearnedForms />
      <CreateCheckboxWTKForms />
      <EditCheckboxWTKForms />
      <EditPGKnowForms />
      <CreatePGKnowForms />
      <CreatePGLearnedForms />

      <CreateQuizModal />

      <CreateTopicForms courseId={params.id_course} />

      <EditEssayKnowForms />
      <EditEssayLearnedForms />
      <EditEssayWTKForms />
      <EditPreReadingMaterialForms />
      <EditPGLearnedForms />
      <DeleteTopicConfirmation />
      <DeleteKWLConfirmation />
      <HideTopicConfirmation />
      <ArchiveTopicConfirmation />
    </main>
  );
}
