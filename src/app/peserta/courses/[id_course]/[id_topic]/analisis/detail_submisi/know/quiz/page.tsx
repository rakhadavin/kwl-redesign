'use client';
import QuizParent from "@/app/components/card/AnalysisQuizCard";
import KwlTitle from "@/app/components/kwl/KwlTitle";
import { useGetAuth } from "@/app/lib/api/useAuth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";



const DetailSubmissionKnowQuizPage = () => {
    const params = useParams();
    const id_topic = params.id_topic;
    const router = useRouter();
    const pathname = usePathname();
    const newPath = pathname.split("/").slice(0, 6).join("/");
    const { data : session } = useSession();
    const { data: quiz_data } = useGetAuth(`/api/analysis/quiz-accuracy/know/${id_topic}`, "know accuracy");

    return (        

        <div className="flex flex-col items-center bg-white">

        <div className="mt-16 text-3xl font-bold text-center text-blue-900 max-md:mt-10">
        {quiz_data?.course_short_name}
        </div>
        <div className="mt-3 text-2xl font-medium text-center text-blue-900">
        {quiz_data?.topic}
        </div>

        <QuizParent accuracy_data={quiz_data?.quiz_data} />
        
       
        <div className="flex gap-5 mt-32 max-w-full text-sm font-bold text-center w-[616px] max-md:flex-wrap max-md:mt-10">
          <div onClick={
            () => router.back()
          
          } className="grow justify-center items-center px-16 py-3 whitespace-nowrap bg-white rounded-lg border border-solid border-blue-950 text-blue-950 w-fit max-md:px-5">
            kembali
          </div>
          <Link href={`${newPath}/submisi_individu/${session?.userinfo.role_pk}/know/quiz`}>
          <div className="grow justify-center items-center px-16 py-3 text-white rounded-lg bg-blue-950 w-fit max-md:px-5">
            lihat submisi individu
          </div>
          </Link>
        </div>
   
      </div>
    )
};


export default DetailSubmissionKnowQuizPage;
