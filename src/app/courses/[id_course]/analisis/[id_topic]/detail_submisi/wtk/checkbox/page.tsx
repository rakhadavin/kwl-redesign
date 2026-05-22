"use client";
import CheckBoxParent from "@/app/components/card/AnalysisCheckBoxCard";
import KwlTitle from "@/app/components/kwl/KwlTitle";
import KwlUnavailablePage from "@/app/components/message/UnavailableMessage";
import Spinner from "@/app/components/spinner/spinner";
import { useGetAuth } from "@/app/lib/api/useAuth";
import { stat } from "fs";
import { useParams, usePathname, useRouter } from "next/navigation";
import Breadcrumb from "@/app/components/navigation/Breadcrumb";

export default function DetailSubmissionWtkCheckboxPage() {
  const params = useParams();
  const id_topic = params.id_topic;
  const router = useRouter();
  const pathname = usePathname();
  const { data: poll, status } = useGetAuth(`/api/analysis/poll/${id_topic}`, "wtk", true);
  const newPath = pathname.split("/").slice(0, 5).join("/");

  return (
    <>
    {status === "success" ? (
    <main className="py-5 text-center bg-[url('/bg1.png')] bg-scroll bg-cover min-h-screen">
      <Breadcrumb items={[{ label: "Beranda", href: "/courses" }, { label: poll?.course?.short_name ?? "...", href: `/courses/${params.id_course}` }, { label: "Analisis", href: `/courses/${params.id_course}/analisis` }, { label: poll?.topic ?? "...", href: `/courses/${params.id_course}/analisis/${params.id_topic}` }, { label: "WTK" }, { label: "Checkbox" }]} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="white"
        className="w-6 h-6 ml-5 text-main hover:opacity-80 cursor-pointer"
        onClick={router.back}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>
      <KwlTitle course={poll?.course?.short_name} topic={poll?.topic} />

      <CheckBoxParent
        question={poll?.question}
        choices={poll?.choices}
        stage="Want To Know"
        topic={poll?.topic}
      />
    
    </main>
  ) : status === "pending" ? (
    <Spinner />
  ) : (
    <div className="flex justify-center items-center min-h-screen">
    <KwlUnavailablePage
      title="Analisis belum tersedia"
      message="Belum ada mahasiswa yang mengisi Want To Know."
      image="/sad_kowl.png"
    />
    </div>
  )}
  </>
  );
}

