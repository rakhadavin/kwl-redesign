"use client";

import CreateCourseForms from "../components/forms/CreateCourseForms";
import CreateCourse2Forms from "../components/forms/CreateCourse2Forms";
import { useGetAuth } from "../lib/api/useAuth";
import AllCourseContainer from "../components/card/AllCourseContainer";
import { useSession } from "next-auth/react";
import DeleteCourseConfirmation from "../components/message/DeleteCourseConfirmation";
import SuccessDeleteCourse from "../components/message/SuccessDeleteCourse";
import SuccessCreateCourse from "../components/message/SuccessCreateCourse";
import ConsentModal from "../components/consent-modal/ConsentModal";
import useCreateCourseForms from "../hooks/useCreateCourseForms";
import { useState } from "react";
import axios from "axios";
import Breadcrumb from "../components/navigation/Breadcrumb";

export default function MyCoursesPage() {
  const { data, status } = useGetAuth("/api/course/lecturer", "all courses");
  const { data: session } = useSession();
  const [consentSubmitted, setConsentSubmitted] = useState(false);
  const createCourseForms = useCreateCourseForms();

  const { data: consentStatus, isLoading: consentLoading } = useGetAuth(
    "/api/auth/consent/status",
    "consent_status",
    false,
    !!session,
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
    <main className="p-5">
      <Breadcrumb items={[{ label: "Beranda" }]} variant="light" />
      <ConsentModal
        isOpen={showModal}
        onConfirm={handleConsentConfirm}
        onCancel={() => setConsentSubmitted(true)}
      />
      <div className="flex items-start">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="hidden sm:block w-6 h-6 ml-5 text-main hover:opacity-80 cursor-pointer hidden-xs"
          onClick={router.back}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg> */}
        <div className="flex-1">
          <h1 className="py-5 text-main font-bold text-2xl text-center">
            All Courses
          </h1>

          <h2 className="py-5 text-black font-bold text-xl text-center">
            Courses
          </h2>
        </div>
      </div>


      <AllCourseContainer
        data={data || []}
        lecturer_pk={session?.userinfo.role_pk || 0}
        isLoading={status === "pending"}
        showSearch={true}
        showAddButton={true}
        onAddCourse={() => createCourseForms.open()}
      />

      <CreateCourseForms />
      <CreateCourse2Forms />
      <DeleteCourseConfirmation />
      <SuccessCreateCourse />
    </main>
  );
}
