"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useEditEssayKnowForms from "@/app/hooks/useEditEssayKnowForms";
import useDeleteKWLConfirmation from "@/app/hooks/useDeleteKWLConfirmation";
import useDeleteTopicConfirmation from "@/app/hooks/useDeleteTopicConfirmation";
import useChooseKnowType from "@/app/hooks/useChooseKnowType";
import useChooseWTKType from "@/app/hooks/useChooseWTKType";
import useChooseLearnedType from "@/app/hooks/useChooseLearnedType";
import { usePathname } from "next/navigation";

interface TopicKWLCardProps {
  label: string;
  imageFile: string;
  id: number;
  topicId: number;
  knowId?: number;
  wtkId?: number;
  learnedId?: number;
  kwlType?: string;
  handleEdit: () => void;
  handleNext: () => void;
}

const TopicKWLCard: React.FC<TopicKWLCardProps> = ({
  label,
  imageFile,
  id,
  topicId,
  handleEdit,
  handleNext,
  knowId,
  wtkId,
  learnedId,
  kwlType,
}) => {
  const editEssayKnowForms = useEditEssayKnowForms();
  const deleteKWLConfirmation = useDeleteKWLConfirmation();
  const deleteTopicConfirmation = useDeleteTopicConfirmation();
  const pathname = usePathname();
  let type;

  if (typeof knowId !== "undefined") {
    type = "know";
  } else if (typeof wtkId !== "undefined") {
    type = "wtk";
  } else {
    type = "learned";
  }

  const colorMap: Record<string, string> = {
    know: "bg-orange-50 border-orange-400",
    wtk: "bg-indigo-50 border-indigo-300",
    learned: "bg-pink-50 border-pink-300",
  };

  return (
    <>
      <div className={`my-1 px-4 py-2 rounded justify-start items-center border ${colorMap[type]}`}>
        <div className="w-56 h-12 relative items-center justify-center flex">
          <Link
            href={`${pathname}/${topicId}/${
              label !== "Want to Know" ? label.toLowerCase() : "wtk"
            }/${
              kwlType === "essay" && label !== "Want to Know"
                ? "reflection"
                : kwlType === "essay" && label === "Want to Know"
                ? "essay"
                : kwlType === "checkbox"
                ? "checkbox"
                : "quiz"
            }`}
          >
            <button className="left-[60px] top-[12px] absolute text-black text-xs font-bold hover:underline">
              {label}
            </button>
          </Link>

          <button
            className="left-[60px] top-[30px] absolute text-black text-[10px] hover:underline"
            onClick={handleEdit}
          >
            edit
          </button>
          <button
            className="left-[100px] top-[30px] absolute text-black text-[10px] hover:underline"
            onClick={() => {
              deleteKWLConfirmation.open(topicId, handleNext);
            }}
          >
            delete
          </button>
          <Link
                href={`${pathname}/analisis/${topicId}/detail_submisi/${type}/${
              kwlType === "essay" && label !== "Want to Know"
                ? "reflection"
                : kwlType === "essay" && label === "Want to Know"
                ? "reflection"
                : kwlType === "checkbox"
                ? "checkbox"
                : "quiz"
            }`}
          >
            <button className="left-[152px] top-[30px] absolute text-black text-[10px] hover:underline">
              rekap
            </button>
          </Link>
          <div className="w-12 h-12 left-0 top-0 absolute bg-blue-900" />
          <div className="absolute inline-flex left-0 top-0">
            <img className="w-12 h-12" src={`/${imageFile}.png`} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TopicKWLCard;
