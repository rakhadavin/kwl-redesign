"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

import useCreateQuizModal from "@/app/hooks/useCreateQuizModal";

import useChooseKnowType from "@/app/hooks/useChooseKnowType";
import useChooseWTKType from "@/app/hooks/useChooseWTKType";
import useChooseLearnedType from "@/app/hooks/useChooseLearnedType";
import usePreReadingMaterialForms from "@/app/hooks/usePreReadingMaterialForms";
import useCreateEssayWTKForms from "@/app/hooks/useCreateEssayWTKForms";
import useCreateEssayKnowForms from "@/app/hooks/useCreateEssayKnowForms";
import useCreateEssayLearnedForms from "@/app/hooks/useCreateEssayLearnedForms";
import useCreatePGKnowForms from "@/app/hooks/useCreatePGKnow";
import useCreatePGLearnedForms from "@/app/hooks/useCreatePGLearned";
import useCreateCheckboxWTKForms from "@/app/hooks/useCreateCheckboxWTK";

interface ImageButtonProps {
  label?: string;
  sublabel?: string;
  imageFile?: string;
  next?: string;
  close: string;
  // knowId?: number | null;
  // wtkId?: number | null;
  // learnedId?: number | null;
  id?: number;
  topicId?: number;
}

const ImageButton: React.FC<ImageButtonProps> = ({
  label,
  sublabel,
  imageFile,
  next,
  close,
  // knowId,
  // wtkId,
  // learnedId,
  id,
  topicId,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  // const currentPath = router.

  const createQuizModal = useCreateQuizModal();
  const chooseKnowType = useChooseKnowType();
  const chooseWTKType = useChooseWTKType();
  const chooseLearnedType = useChooseLearnedType();
  const preReadingMaterialForms = usePreReadingMaterialForms();
  const createEssayKnowForms = useCreateEssayKnowForms();
  const createEssayWTKForms = useCreateEssayWTKForms();
  const createEssayLearnedForms = useCreateEssayLearnedForms();
  const createPGKnowForms = useCreatePGKnowForms();
  const createCheckboxWTKForms = useCreateCheckboxWTKForms();
  const createPGLearnedForms = useCreatePGLearnedForms();

  return (
    <>
      {/* <p>{knowId}</p>
      <p>{wtkId}</p>
      <p>{learnedId}</p> */}
      {/* <p>{id}</p> */}
      {/* <p>{topicId}</p> */}
      <button
        onClick={() => {
          if (next === "know") {
            if (typeof topicId !== "undefined") {
              chooseKnowType.open(topicId);
            }
          } else if (next === "wtk") {
            if (typeof topicId !== "undefined") {
              chooseWTKType.open(topicId);
            }
          } else if (next === "learned") {
            if (typeof topicId !== "undefined") {
              chooseLearnedType.open(topicId);
            }
          } else if (next === "pre-reading") {
            preReadingMaterialForms.open();
          } else if (next === "createEssayKnowForms") {
            if (typeof topicId !== "undefined") {
              createEssayKnowForms.open(topicId);
            }
          } else if (next === "createEssayWTKForms") {
            if (typeof topicId !== "undefined") {
              createEssayWTKForms.open(topicId);
            }
          } else if (next === "createEssayLearnedForms") {
            if (typeof topicId !== "undefined") {
              createEssayLearnedForms.open(topicId);
            }
          } else if (next === "createPGKnowForms") {
            if (typeof topicId !== "undefined") {
              createPGKnowForms.open(topicId);
            }
          } else if (next === "createCheckboxWTKForms") {
            if (typeof topicId !== "undefined") {
              createCheckboxWTKForms.open(topicId);
            }
          } else if (next === "createPGLearnedForms") {
            if (typeof topicId !== "undefined") {
              createPGLearnedForms.open(topicId);
            }
          }

          if (close === "know") {
            chooseKnowType.close();
          } else if (close === "wtk") {
            chooseWTKType.close();
          } else if (close === "learned") {
            chooseLearnedType.close();
          } else if (close === "quiz modal") {
            createQuizModal.close();
          } else if (close === "createEssayKnowForms") {
            createEssayKnowForms.close();
          } else if (close === "createEssayWTKForms") {
            createEssayWTKForms.close();
          } else if (close === "createEssayLearnedForms") {
            createEssayLearnedForms.close();
          } else if (close === "createPGKnowForms") {
            createPGKnowForms.close();
          } else if (close === " createCheckboxWTKForms") {
            createCheckboxWTKForms.close();
          } else if (close === " createPGLearnedForms") {
            createPGLearnedForms.close();
          }
        }}
        className={`${
          typeof id !== "undefined" && id > 0
            ? "hover:opacity-50 opacity-50 cursor-not-allowed"
            : "hover:opacity-80 "
        } `}
        disabled={typeof id !== "undefined" && id > 0}
        // className="opacity-50 cursor-not-allowed"
      >
        <div className="my-1 w-60 h-12 pr-2 bg-white rounded shadow justify-start items-center inline-flex">
          <div className="w-56 h-12 relative">
            <div className="left-[60px] top-[12px] absolute text-black text-xs font-bold">
              {label}
            </div>
            <div className="left-[60px] top-[27px] absolute text-black text-[10px]">
              {sublabel}
            </div>
            <div className="w-12 h-12 left-0 top-0 absolute bg-blue-900" />
            <div
              className={`absolute inline-flex ${
                imageFile === "pg"
                  ? "left-1.5 top-2.5"
                  : imageFile === "checkbox"
                  ? "left-1.5 top-2"
                  : imageFile === "refleksi"
                  ? "left-0.5 top-0"
                  : "left-0 top-0"
              }`}
            >
              <img
                className={`${
                  imageFile === "pg"
                    ? "w-8 h-6"
                    : imageFile === "checkbox"
                    ? "w-12 h-8"
                    : imageFile === "refleksi"
                    ? "w-11 h-10"
                    : "w-12 h-12"
                }`}
                src={`/${imageFile}.png`}
              />
            </div>
          </div>
        </div>
      </button>
    </>
  );
};

export default ImageButton;
