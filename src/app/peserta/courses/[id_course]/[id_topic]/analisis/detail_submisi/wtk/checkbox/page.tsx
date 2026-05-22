"use client";
import CheckBoxParent from "@/app/components/card/AnalysisCheckBoxCard";
import KwlTitle from "@/app/components/kwl/KwlTitle";
import { useGetAuth } from "@/app/lib/api/useAuth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import Breadcrumb from "@/app/components/navigation/Breadcrumb";

export default function DetailSubmissionWtkCheckboxPage() {
  const params = useParams();
  const id_topic = params.id_topic;
  const router = useRouter();
  const { data: poll } = useGetAuth(`/api/analysis/poll/${id_topic}`, "wtk");
  const pathname = usePathname();
  const newPath = pathname.split("/").slice(0, 6).join("/");
  const { data: session } = useSession();
  return (
    <main className="py-5 text-center bg-[url('/bg1.png')] bg-scroll bg-cover min-h-screen">
      <div className="flex flex-col items-center">
      <Breadcrumb items={[
        { label: "Beranda", href: "/peserta" },
        { label: "Kursus", href: `/peserta/courses/${params.id_course}` },
        { label: poll?.course?.short_name ?? "..." },
        { label: poll?.topic ?? "..." },
        { label: "Analisis > WTK > Checkbox" },
      ]} />
      <KwlTitle course={poll?.course?.short_name} topic={poll?.topic} />
      <CheckBoxParent
        question={poll?.question}
        choices={poll?.choices}
        stage="Want To Know"
        topic={poll?.topic}
      />

    <div className="flex gap-5 mt-32 max-w-full text-sm font-bold text-center w-[616px] max-md:flex-wrap max-md:mt-10">
              <div onClick={
                () => router.back()
              
              } className="grow justify-center items-center px-16 py-3 whitespace-nowrap bg-white rounded-lg border border-solid border-blue-950 text-blue-950 w-fit max-md:px-5">
                kembali
              </div>
              <Link href={`${newPath}/submisi_individu/${session?.userinfo.role_pk}/wtk/checkbox`}>
              <div className="grow justify-center items-center px-16 py-3 text-white rounded-lg bg-yellow-400 w-fit max-md:px-5">
                lihat submisi individu
              </div>
              </Link>
            </div>
            </div>
    </main>
  );
}
