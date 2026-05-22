"use client";
import KwlTitle from "@/app/components/kwl/KwlTitle";
import { useGetAuth } from "@/app/lib/api/useAuth";
import { useParams, useRouter } from "next/navigation";
import Breadcrumb from "@/app/components/navigation/Breadcrumb";

type ReflectionAnswerCardProps = {
  reflection: string;
  question: string;
  topic: string;
  stage: string;
  image: string;
  handleClick?: () => void;
};
const DetailAnswerWtkReflectionPage = () => {
  const { id_topic, id_peserta, id_course } = useParams();
  const { data: answer } = useGetAuth(
    `/api/analysis/student-answer-detail/wtk/${id_topic}/${id_peserta}`,
    "know"
  );
  const router = useRouter();
  return (
    <main className="py-5 text-center bg-[url('/bg1.png')] bg-cover min-h-screen">
      <Breadcrumb items={[
        { label: "Beranda", href: "/peserta" },
        { label: "Kursus", href: `/peserta/courses/${id_course}` },
        { label: answer?.course ?? "..." },
        { label: answer?.topic ?? "..." },
        { label: "WTK > Refleksi" },
      ]} />
      <KwlTitle course={answer?.course} topic={answer?.topic} />
      <ReflectionAnswerCard
        reflection={answer?.answer}
        question={answer?.question}
        topic={answer?.topic}
        stage="Want To Know"
        image="/wtk.png"
        handleClick={() => router.back()}
      />
    </main>
  );
};

const ReflectionAnswerCard = ({
  reflection,
  question,
  topic,
  stage,
  image,
  handleClick,
}: ReflectionAnswerCardProps) => {
  return (
    <div className="flex items-center justify-center text-center">
      <div className="h-auto w-96 w-[90%] md:w-[70%] lg:w-[800px] relative bg-white rounded-lg shadow p-8">
        <div className="pb-4 pt-8 inline-flex text-left items-center">
          <img src={image} width="64" />
          <div className="px-4">
            <h1 className="text-xl font-extrabold">{stage}</h1>
            <h2 className="text-xs">{topic}</h2>
          </div>
        </div>

        <div className="pt-2 pb-8">
          <span className="text-sm"> {question} </span>
        </div>

        <div className="block p-2.5 w-full text-sm rounded-lg border border-gray-100 bg-gray-50 shadow-sm text-left min-h-[200px] whitespace-pre-wrap">
          {reflection}
        </div>

        <button
          onClick={handleClick}
          className="text-xs text-white font-bold w-[120px] p-1 mt-4 ml-8 shadow text-center bg-yellow-400 rounded"
        >
          kembali
        </button>
      </div>
    </div>
  );
};

export default DetailAnswerWtkReflectionPage;
