"use client";

import KwlTitle from "@/app/components/kwl/KwlTitle";
import { useGetAuth } from "@/app/lib/api/useAuth";
import { useParams, useRouter } from "next/navigation";

type CheckBoxCardParentProps = {
  stage: string;
  topic: string;
  question: string;
  image: string;
  options: { choice: string; selected: boolean }[];
  handleClick?: () => void;
};
export default function DetailAnswerWtkCheckboxPage() {
  const { id_topic, id_peserta } = useParams();
  const { data: answer } = useGetAuth(
    `/api/analysis/student-answer-detail/wtk/${id_topic}/${id_peserta}`,
    "checkbox"
  );
  const router = useRouter();

  return (
    <main className="py-5 text-center bg-[url('/bg1.png')] bg-cover min-h-screen">
      <KwlTitle course={answer?.course?.short_name} topic={answer?.topic} />

      <CheckBoxParent
        stage="Want to Know"
        topic={answer?.data?.name}
        question={answer?.question}
        image="/wtk.png"
        options={answer?.choices}
        handleClick={() => router.back()}
      />
    </main>
  );
}

interface CheckBoxProps {
  content: string;
  checked: boolean;
}

const CheckBox: React.FC<CheckBoxProps> = ({ content, checked }) => {
  return (
    <div
      id="answer"
      className="mb-4 h-auto w-96 w-[90%] md:w-[80%] lg:w-[700px] relative bg-white rounded-lg shadow p-3 pl-6 text-left"
    >
      <input type="checkbox" checked={checked} className="rounded mr-2"></input>
      <span className="text-sm"> {content} </span>
    </div>
  );
};

const CheckBoxParent = ({
  stage,
  topic,
  question,
  image,
  options,
  handleClick,
}: CheckBoxCardParentProps) => {
  return (
    <div className="flex items-center justify-center text-center">
      <div className="h-auto w-96 w-[90%] md:w-[80%] lg:w-[800px] relative bg-white rounded-lg shadow p-8 justify-center">
        <div className="pb-4 pt-8 inline-flex text-left items-center">
          <img src={image} width="64" />
          <div className="px-4">
            <h1 className="text-xl font-extrabold">{stage}</h1>
            <h2 className="text-xs">{topic}</h2>
          </div>
        </div>

        <div id="question" className="my-2 mb-6">
          <span className="text-sm"> {question} </span>
        </div>

        {options?.map(
          (
            content: { choice: string; selected: boolean },
            index: React.Key | null | undefined
          ) => (
            <div key={index}>
              <CheckBox content={content.choice} checked={content.selected} />
            </div>
          )
        )}

        <button onClick={handleClick} className="text-xs text-white font-bold w-[120px] p-1 mt-4 ml-8 shadow text-center bg-yellow-400 rounded">
          kembali
        </button>
      </div>
    </div>
  );
};
