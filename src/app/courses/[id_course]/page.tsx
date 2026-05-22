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
import { useGetAuth } from "@/app/lib/api/useAuth";
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
      <div className="flex  flex-col  w-full align-middle justify-center items-center gap-2 pb-5">
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
        <h1 className="flex-1  text-main font-bold text-2xl text-center">
          {data && data["short_name"]} 
        </h1>

        <p className="text-gray-300">{data && data["full_name"]}</p>
      </div>

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
